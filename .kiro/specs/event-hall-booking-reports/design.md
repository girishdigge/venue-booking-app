# Design Document: Event Hall Booking Reports

## Overview

The Event Hall Booking Reports module is a comprehensive reporting feature that enables users to generate, view, and download event booking reports in PDF or Excel format. The module integrates seamlessly into the existing Next.js application, adding a new "Reports" navigation tab and a dedicated Reports page with date range filtering capabilities.

The design follows a clean separation of concerns with distinct layers for UI presentation, business logic, data access, and file generation. The module leverages existing UI components from the application's component library and follows established patterns for API routes and server-side data fetching.

### Key Design Principles

1. **Server-Side Processing**: All data filtering and report generation logic executes on the server to ensure security and performance
2. **Modular Architecture**: Separate components for UI, data fetching, filtering, formatting, and file generation
3. **Type Safety**: Full TypeScript implementation with proper type definitions for all data structures
4. **Reusability**: Shared utilities for date handling, currency formatting, and status calculation
5. **User Experience**: Clear feedback for empty results, loading states, and error conditions

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer (Browser)                   │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ Navigation   │  │ Reports Page │  │ Date Pickers    │   │
│  │ Component    │  │ Component    │  │ & Buttons       │   │
│  └──────────────┘  └──────────────┘  └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Layer (Next.js)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐  ┌──────────────────────────┐    │
│  │ /api/reports/data    │  │ /api/reports/download    │    │
│  │ (Fetch filtered data)│  │ (Generate PDF/Excel)     │    │
│  └──────────────────────┘  └──────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Business Logic Layer                       │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │ Date Filter  │  │ Status       │  │ Summary         │   │
│  │ Service      │  │ Calculator   │  │ Calculator      │   │
│  └──────────────┘  └──────────────┘  └─────────────────┘   │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │ PDF          │  │ Excel        │                        │
│  │ Generator    │  │ Generator    │                        │
│  └──────────────┘  └──────────────┘                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data Access Layer                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Prisma Client (Event Model)               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        Database                              │
│                      (Event Table)                           │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Interaction**: User selects date range and clicks download button
2. **API Request**: Client sends POST request to `/api/reports/download` with date range and format
3. **Data Fetching**: API route queries database via Prisma with date filters
4. **Data Processing**: Events are sorted, status is calculated, summary is computed
5. **File Generation**: PDF or Excel generator creates file with formatted data
6. **File Download**: Generated file is sent to client with appropriate headers

## Components and Interfaces

### 1. Navigation Component Update

**Location**: Existing navigation component (navbar/sidebar)

**Changes Required**:

- Add "Reports" navigation item
- Position between "Employee" and "Logout"
- Link to `/reports` route

**Interface**:

```typescript
interface NavItem {
  label: string;
  href: string;
  position: number;
}
```

### 2. Reports Page Component

**Location**: `app/reports/page.tsx`

**Responsibilities**:

- Render date pickers for start and end dates
- Render download buttons for PDF and Excel
- Handle user interactions
- Display loading states and error messages
- Show empty results message when applicable

**Component Structure**:

```typescript
interface ReportsPageProps {}

interface ReportsPageState {
  startDate: Date | null;
  endDate: Date | null;
  isLoading: boolean;
  error: string | null;
}
```

**UI Elements**:

- Start Date Picker (using existing date picker component)
- End Date Picker (using existing date picker component)
- Download as PDF Button
- Download as Excel Button
- Loading indicator
- Error message display
- Empty results message

### 3. Date Filter Service

**Location**: `lib/services/reportService.ts`

**Responsibilities**:

- Validate date range inputs
- Query database with date filters
- Return filtered event records

**Interface**:

```typescript
interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface FilteredEventsResult {
  events: Event[];
  count: number;
}

async function fetchEventsByDateRange(
  dateRange: DateRange,
): Promise<FilteredEventsResult>;
```

**Implementation Details**:

- Use Prisma's `where` clause with `gte` and `lte` operators
- Apply timezone-safe date comparison using UTC
- Sort results by date ascending

### 4. Event Status Calculator

**Location**: `lib/utils/eventStatus.ts`

**Responsibilities**:

- Determine if an event is "Complete" or "Upcoming"
- Use timezone-safe date comparison

**Interface**:

```typescript
type EventStatus = 'Complete' | 'Upcoming';

function calculateEventStatus(eventDate: Date): EventStatus;
```

**Logic**:

- Compare event date with current date (both in UTC)
- If event date < today: "Complete"
- If event date >= today: "Upcoming"

### 5. Summary Calculator

**Location**: `lib/utils/summaryCalculator.ts`

**Responsibilities**:

- Calculate total number of bookings
- Calculate total turnover (sum of amounts)

**Interface**:

```typescript
interface ReportSummary {
  totalBookings: number;
  totalTurnover: number;
}

function calculateSummary(events: Event[]): ReportSummary;
```

### 6. Currency Formatter

**Location**: `lib/utils/currencyFormatter.ts`

**Responsibilities**:

- Format numbers as Indian Rupee currency

**Interface**:

```typescript
function formatINR(amount: number): string;
```

**Implementation**:

- Use Intl.NumberFormat with locale 'en-IN' and currency 'INR'
- Return formatted string with ₹ symbol

### 7. Report Data Transformer

**Location**: `lib/utils/reportTransformer.ts`

**Responsibilities**:

- Transform Event records into report row format
- Add serial numbers
- Calculate event status for each row
- Format currency values

**Interface**:

```typescript
interface ReportRow {
  srNo: number;
  name: string;
  eventType: string;
  amount: string;
  eventStatus: EventStatus;
}

function transformEventsToReportRows(events: Event[]): ReportRow[];
```

### 8. PDF Generator

**Location**: `lib/generators/pdfGenerator.ts`

**Responsibilities**:

- Generate PDF document from report data
- Include table with all columns
- Include summary section
- Return PDF buffer

**Interface**:

```typescript
interface PDFGeneratorOptions {
  rows: ReportRow[];
  summary: ReportSummary;
  dateRange: DateRange;
}

async function generatePDF(options: PDFGeneratorOptions): Promise<Buffer>;
```

**Library**: Use `pdfkit` or `jspdf` for PDF generation

**Layout**:

- Title: "Event Booking Report"
- Date Range: "From {startDate} to {endDate}"
- Table with 5 columns
- Summary section at bottom

### 9. Excel Generator

**Location**: `lib/generators/excelGenerator.ts`

**Responsibilities**:

- Generate Excel spreadsheet from report data
- Include table with all columns
- Include summary section
- Return Excel buffer

**Interface**:

```typescript
interface ExcelGeneratorOptions {
  rows: ReportRow[];
  summary: ReportSummary;
  dateRange: DateRange;
}

async function generateExcel(options: ExcelGeneratorOptions): Promise<Buffer>;
```

**Library**: Use `xlsx` or `exceljs` for Excel generation

**Layout**:

- Sheet name: "Event Report"
- Header row with column names
- Data rows
- Empty row
- Summary rows (Total Bookings, Total Turnover)

### 10. File Name Generator

**Location**: `lib/utils/fileNameGenerator.ts`

**Responsibilities**:

- Generate standardized file names with date range

**Interface**:

```typescript
function generateReportFileName(
  startDate: Date,
  endDate: Date,
  format: 'pdf' | 'xlsx',
): string;
```

**Format**: `event-report_{YYYY-MM-DD}_to_{YYYY-MM-DD}.{extension}`

### 11. API Route: Fetch Report Data

**Location**: `app/api/reports/data/route.ts`

**Method**: POST

**Request Body**:

```typescript
interface ReportDataRequest {
  startDate: string; // ISO date string
  endDate: string; // ISO date string
}
```

**Response**:

```typescript
interface ReportDataResponse {
  rows: ReportRow[];
  summary: ReportSummary;
  count: number;
}
```

**Error Responses**:

- 400: Invalid date range
- 500: Server error

### 12. API Route: Download Report

**Location**: `app/api/reports/download/route.ts`

**Method**: POST

**Request Body**:

```typescript
interface DownloadReportRequest {
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  format: 'pdf' | 'excel';
}
```

**Response**:

- Success: File buffer with appropriate Content-Type and Content-Disposition headers
- Error: JSON error response

**Headers**:

- PDF: `Content-Type: application/pdf`
- Excel: `Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- `Content-Disposition: attachment; filename="{generated_filename}"`

## Data Models

### Event Model (Existing)

```typescript
interface Event {
  id: number;
  client_name: string;
  date: Date;
  start_time: string;
  end_time: string;
  email: string | null;
  contact: string;
  address: string | null;
  event_name: string;
  hall: Hall;
  details: string | null;
  bookingBy: string | null;
  reference: string | null;
  hallHandover: boolean | null;
  decoration: boolean | null;
  catering: boolean | null;
  kitchen: boolean | null;
  amount: number;
  advance: number;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
```

**Fields Used in Reports**:

- `client_name`: Maps to "Name" column
- `event_name`: Maps to "Event Type" column
- `amount`: Maps to "Amount" column
- `date`: Used for filtering and status calculation

### Report Row Model

```typescript
interface ReportRow {
  srNo: number; // Auto-generated serial number
  name: string; // From Event.client_name
  eventType: string; // From Event.event_name
  amount: string; // From Event.amount, formatted as ₹
  eventStatus: 'Complete' | 'Upcoming'; // Calculated based on Event.date
}
```

### Report Summary Model

```typescript
interface ReportSummary {
  totalBookings: number; // Count of events
  totalTurnover: number; // Sum of Event.amount values
}
```

### Date Range Model

```typescript
interface DateRange {
  startDate: Date;
  endDate: Date;
}
```

### Report Request Models

```typescript
interface ReportDataRequest {
  startDate: string; // ISO 8601 date string
  endDate: string; // ISO 8601 date string
}

interface DownloadReportRequest extends ReportDataRequest {
  format: 'pdf' | 'excel';
}
```

### Report Response Models

```typescript
interface ReportDataResponse {
  rows: ReportRow[];
  summary: ReportSummary;
  count: number;
}

interface ErrorResponse {
  error: string;
  message: string;
}
```

## Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

### Property 1: Date Range Filtering

_For any_ date range (start date and end date) and any set of events, all events returned by the Date_Filter should have Event.date >= start date AND Event.date <= end date.

**Validates: Requirements 3.2, 3.3**

### Property 2: Sequential Serial Numbers

_For any_ list of events in a report, the Sr No column should contain sequential integers starting from 1, with each row having Sr No = previous row's Sr No + 1.

**Validates: Requirements 4.1**

### Property 3: Report Data Mapping

_For any_ event in the filtered results, the corresponding report row should have:

- Name = Event.client_name
- Event Type = Event.event_name
- Amount (numeric value) = Event.amount

**Validates: Requirements 4.2, 4.3, 4.4**

### Property 4: Column Order Consistency

_For any_ generated report (PDF or Excel), the columns should appear in exactly this order: Sr No, Name, Event Type, Amount, Event Status.

**Validates: Requirements 4.6**

### Property 5: Currency Formatting Consistency

_For any_ report, all monetary values (individual amounts and Total Turnover) should be formatted with the Indian Rupee symbol (₹) using consistent formatting rules.

**Validates: Requirements 5.1, 5.2, 5.3**

### Property 6: Event Status Calculation

_For any_ event, the Event Status should be:

- "Complete" if Event.date < current date
- "Upcoming" if Event.date >= current date

**Validates: Requirements 6.1, 6.3**

### Property 7: Total Bookings Accuracy

_For any_ set of filtered events, the Total Bookings value in the summary should equal the count of events in the filtered results.

**Validates: Requirements 7.1, 7.2**

### Property 8: Total Turnover Accuracy

_For any_ set of filtered events, the Total Turnover value in the summary should equal the sum of all Event.amount values in the filtered results.

**Validates: Requirements 7.3, 7.4**

### Property 9: Summary Section Positioning

_For any_ generated report (PDF or Excel), the summary section (Total Bookings and Total Turnover) should appear after all event data rows.

**Validates: Requirements 7.5**

### Property 10: Date-Based Sorting

_For any_ list of events in a report, the events should be sorted by Event.date in ascending order, and the Sr No should reflect this sort order (earlier dates have lower Sr No).

**Validates: Requirements 8.1, 8.2**

### Property 11: PDF File Structure

_For any_ PDF report generated, the file should contain:

- All report columns in the specified order
- All filtered event rows
- The summary section

**Validates: Requirements 9.2, 9.3**

### Property 12: PDF Filename Format

_For any_ PDF report with a given date range, the filename should follow the format "event-report*{YYYY-MM-DD}\_to*{YYYY-MM-DD}.pdf" where the dates match the selected start and end dates.

**Validates: Requirements 9.4**

### Property 13: Excel File Structure

_For any_ Excel report generated, the file should contain:

- All report columns in the specified order
- All filtered event rows
- The summary section

**Validates: Requirements 10.2, 10.3**

### Property 14: Excel Filename Format

_For any_ Excel report with a given date range, the filename should follow the format "event-report*{YYYY-MM-DD}\_to*{YYYY-MM-DD}.xlsx" where the dates match the selected start and end dates.

**Validates: Requirements 10.4**

### Property 15: Error Handling Robustness

_For any_ error that occurs during data fetching or file generation, the system should catch the error and return an appropriate error response without crashing.

**Validates: Requirements 12.4**

## Error Handling

### Client-Side Error Handling

**Invalid Date Range**:

- Validation: End date must be >= start date
- Error Message: "End date must be on or after start date"
- Action: Prevent API call, display error message

**Missing Date Selection**:

- Validation: Both start and end dates must be selected
- Error Message: "Please select both start and end dates"
- Action: Disable download buttons until both dates are selected

**Network Errors**:

- Scenario: API request fails due to network issues
- Error Message: "Failed to generate report. Please check your connection and try again."
- Action: Display error message, allow retry

### Server-Side Error Handling

**Database Query Errors**:

- Scenario: Prisma query fails
- Response: 500 Internal Server Error
- Error Message: "Failed to fetch event data"
- Logging: Log full error details for debugging

**Invalid Date Format**:

- Scenario: Client sends malformed date strings
- Response: 400 Bad Request
- Error Message: "Invalid date format. Expected ISO 8601 format."

**File Generation Errors**:

- Scenario: PDF or Excel generation fails
- Response: 500 Internal Server Error
- Error Message: "Failed to generate report file"
- Logging: Log full error details for debugging

**Empty Results**:

- Scenario: No events found in date range
- Response: 200 OK with empty array
- Client Handling: Display "No records found for the selected date range"
- Action: Do not generate downloadable file

### Error Response Format

```typescript
interface ErrorResponse {
  error: string; // Error type/code
  message: string; // User-friendly error message
  details?: string; // Optional technical details (dev mode only)
}
```

### Error Logging

- Log all server-side errors with full stack traces
- Include request context (date range, format, user info if available)
- Use appropriate log levels (error for failures, warn for validation issues)

## Testing Strategy

### Unit Testing

Unit tests will focus on specific examples, edge cases, and error conditions for individual components and utilities.

**Components to Unit Test**:

1. **Currency Formatter** (`lib/utils/currencyFormatter.ts`)
   - Test formatting of various amounts (0, positive, negative, large numbers)
   - Test that ₹ symbol is included
   - Test decimal handling

2. **Event Status Calculator** (`lib/utils/eventStatus.ts`)
   - Test with past dates (should return "Complete")
   - Test with today's date (should return "Upcoming")
   - Test with future dates (should return "Upcoming")
   - Test timezone edge cases

3. **Summary Calculator** (`lib/utils/summaryCalculator.ts`)
   - Test with empty event array
   - Test with single event
   - Test with multiple events
   - Test sum calculation accuracy

4. **File Name Generator** (`lib/utils/fileNameGenerator.ts`)
   - Test with various date ranges
   - Test date formatting (YYYY-MM-DD)
   - Test both PDF and Excel extensions

5. **Report Data Transformer** (`lib/utils/reportTransformer.ts`)
   - Test serial number generation
   - Test data mapping from Event to ReportRow
   - Test with empty array
   - Test with single event
   - Test with multiple events

6. **Date Filter Service** (`lib/services/reportService.ts`)
   - Test with valid date ranges
   - Test with same start and end date
   - Test with events on boundary dates
   - Test with no matching events

7. **API Routes**
   - Test successful requests
   - Test invalid date formats
   - Test missing parameters
   - Test error responses

### Property-Based Testing

Property-based tests will verify universal properties across all inputs using randomized test data. Each test should run a minimum of 100 iterations.

**Property Test Configuration**:

- Library: `fast-check` (for TypeScript/JavaScript)
- Minimum iterations: 100 per test
- Each test tagged with: `Feature: event-hall-booking-reports, Property {N}: {property text}`

**Properties to Test**:

1. **Property 1: Date Range Filtering**
   - Generate: Random date ranges, random event lists with various dates
   - Verify: All returned events fall within the date range
   - Tag: `Feature: event-hall-booking-reports, Property 1: Date Range Filtering`

2. **Property 2: Sequential Serial Numbers**
   - Generate: Random event lists of varying sizes
   - Verify: Sr No starts at 1 and increments by 1 for each row
   - Tag: `Feature: event-hall-booking-reports, Property 2: Sequential Serial Numbers`

3. **Property 3: Report Data Mapping**
   - Generate: Random events with various client names, event names, and amounts
   - Verify: Report rows correctly map all fields
   - Tag: `Feature: event-hall-booking-reports, Property 3: Report Data Mapping`

4. **Property 4: Column Order Consistency**
   - Generate: Random event lists
   - Verify: Column order is always Sr No, Name, Event Type, Amount, Event Status
   - Tag: `Feature: event-hall-booking-reports, Property 4: Column Order Consistency`

5. **Property 5: Currency Formatting Consistency**
   - Generate: Random amounts (positive, zero, large numbers)
   - Verify: All formatted values contain ₹ symbol and use consistent format
   - Tag: `Feature: event-hall-booking-reports, Property 5: Currency Formatting Consistency`

6. **Property 6: Event Status Calculation**
   - Generate: Random dates (past, present, future)
   - Verify: Status is "Complete" for past dates, "Upcoming" for today and future
   - Tag: `Feature: event-hall-booking-reports, Property 6: Event Status Calculation`

7. **Property 7: Total Bookings Accuracy**
   - Generate: Random event lists of varying sizes
   - Verify: Total Bookings equals event count
   - Tag: `Feature: event-hall-booking-reports, Property 7: Total Bookings Accuracy`

8. **Property 8: Total Turnover Accuracy**
   - Generate: Random event lists with various amounts
   - Verify: Total Turnover equals sum of all amounts
   - Tag: `Feature: event-hall-booking-reports, Property 8: Total Turnover Accuracy`

9. **Property 9: Summary Section Positioning**
   - Generate: Random event lists
   - Verify: Summary appears after all data rows in generated files
   - Tag: `Feature: event-hall-booking-reports, Property 9: Summary Section Positioning`

10. **Property 10: Date-Based Sorting**
    - Generate: Random unsorted event lists
    - Verify: Output is sorted by date ascending, Sr No reflects sort order
    - Tag: `Feature: event-hall-booking-reports, Property 10: Date-Based Sorting`

11. **Property 11: PDF File Structure**
    - Generate: Random event lists
    - Verify: Generated PDF contains all columns, all rows, and summary
    - Tag: `Feature: event-hall-booking-reports, Property 11: PDF File Structure`

12. **Property 12: PDF Filename Format**
    - Generate: Random date ranges
    - Verify: Filename matches format with correct dates
    - Tag: `Feature: event-hall-booking-reports, Property 12: PDF Filename Format`

13. **Property 13: Excel File Structure**
    - Generate: Random event lists
    - Verify: Generated Excel contains all columns, all rows, and summary
    - Tag: `Feature: event-hall-booking-reports, Property 13: Excel File Structure`

14. **Property 14: Excel Filename Format**
    - Generate: Random date ranges
    - Verify: Filename matches format with correct dates
    - Tag: `Feature: event-hall-booking-reports, Property 14: Excel Filename Format`

15. **Property 15: Error Handling Robustness**
    - Generate: Various error conditions (invalid dates, database errors, etc.)
    - Verify: System catches errors and returns appropriate responses
    - Tag: `Feature: event-hall-booking-reports, Property 15: Error Handling Robustness`

### Integration Testing

Integration tests will verify that components work together correctly:

1. **End-to-End Report Generation**
   - Test complete flow from date selection to file download
   - Verify data flows correctly through all layers
   - Test both PDF and Excel formats

2. **API Route Integration**
   - Test API routes with real database queries
   - Verify proper error handling and responses
   - Test with various date ranges and edge cases

3. **UI Component Integration**
   - Test Reports page with all components
   - Verify date picker interactions
   - Test button click handlers
   - Verify loading states and error displays

### Test Data Strategy

**For Unit Tests**:

- Use fixed, known test data
- Include edge cases (empty arrays, boundary dates, zero amounts)
- Test specific scenarios explicitly

**For Property Tests**:

- Use `fast-check` arbitraries to generate random data
- Generate events with random dates, names, amounts
- Generate date ranges with random start and end dates
- Ensure generated data covers edge cases (same dates, large amounts, etc.)

**For Integration Tests**:

- Use test database with seeded data
- Include realistic event data
- Test with various date ranges that produce different result sizes

### Testing Tools

- **Unit Testing**: Jest or Vitest
- **Property-Based Testing**: fast-check
- **Integration Testing**: Jest/Vitest with test database
- **UI Testing**: React Testing Library
- **API Testing**: Supertest or similar

### Coverage Goals

- Unit test coverage: 80%+ for utility functions and services
- Property test coverage: All 15 correctness properties implemented
- Integration test coverage: All critical user flows
- Edge case coverage: Empty results, boundary dates, timezone handling
