'use server';

import { EventSchema, eventSchema } from '@/schema/schema';

export const createEvent = async (data: EventSchema) => {
  try {
    const validationResult = eventSchema.safeParse(data);
    if (!validationResult.success) {
      console.error('Zod validation failed:', validationResult.error.issues);
      return {
        success: false,
        error: true,
        message: 'Invalid data provided.',
      };
    }
    const validatedData = validationResult.data;
    const hallname: any = validatedData.hall;
    const timeValidation = validatedData.start_time < validatedData.end_time;

    if (!timeValidation) {
      return {
        success: false,
        error: true,
        message: 'Start time must be less than End time.',
      };
    }
    if (validatedData.amount < validatedData.advance) {
      return {
        success: false,
        error: true,
        message: 'Total "Amount" must be greater than "Advance".',
      };
    }
    const balance = validatedData.amount - validatedData.advance;
    const existingEvent = await prisma?.event.findFirst({
      where: {
        AND: [
          { date: validatedData.date },
          { hall: hallname },
          { start_time: { lt: validatedData.end_time } },
          { end_time: { gt: validatedData.start_time } },
        ],
      },
    });

    if (existingEvent) {
      return {
        success: false,
        error: true,
        message: 'Event already exists on the given date.',
      };
    }

    const eventCreated = await prisma?.event.create({
      data: { ...validatedData, balance },
    });

    console.log('Event created successfully:', eventCreated);

    // 4. Return success response
    return {
      success: true,
      error: false,
      message: 'Event created successfully.',
      data: eventCreated,
    };
  } catch (error) {
    console.error('Error creating event:', error);

    return {
      success: false,
      error: true,
      message: 'An unexpected error occurred while creating the event.',
    };
  }
};

export const updateEvent = async (data: EventSchema) => {
  try {
    if (!data.id) {
      return {
        success: false,
        error: true,
        message: 'Event ID is required for update.',
      };
    }
    console.log(data);

    const eventIdToUpdate = data.id;
    const validationResult = eventSchema.safeParse(data);
    if (!validationResult.success) {
      console.error('Zod validation failed:', validationResult.error.issues);
      return {
        success: false,
        error: true,
        message: 'Invalid data provided.',
      };
    }
    const validatedData = validationResult.data;
    const hallname: any = validatedData.hall;
    const timeValidation = validatedData.start_time < validatedData.end_time;

    if (!timeValidation) {
      return {
        success: false,
        error: true,
        message: 'Start time must be less than End time.',
      };
    }
    if (validatedData.amount < validatedData.advance) {
      return {
        success: false,
        error: true,
        message: 'Total "Amount" must be greater than "Advance".',
      };
    }
    const balance = validatedData.amount - validatedData.advance;
    const existingEvent = await prisma?.event.findFirst({
      where: {
        AND: [
          { id: { not: eventIdToUpdate } },
          { date: validatedData.date },
          { hall: hallname },
          { start_time: { lt: validatedData.end_time } },
          { end_time: { gt: validatedData.start_time } },
        ],
      },
    });

    if (existingEvent) {
      return {
        success: false,
        error: true,
        message: 'Event already exists on the given date.',
      };
    }
    const { id, ...updateDataPayload } = validatedData;
    console.log(id);

    const eventUpdated = await prisma?.event.update({
      where: {
        id: eventIdToUpdate, // Use the stored ID for the where clause
      },
      data: { ...updateDataPayload, balance },
    });

    console.log('Event updated successfully:', eventUpdated);

    // 4. Return success response
    return {
      success: true,
      error: false,
      message: 'Event updated successfully.',
      data: eventUpdated,
    };
  } catch (error: any) {
    console.error('Error updating event:', error); // Log the actual error

    // Handle specific Prisma error for record not found during update
    if (error.code === 'P2025') {
      // Prisma error code for "Record to update not found."
      return {
        success: false,
        error: true,
        message: 'Event not found. Could not update.',
      };
    }

    // Return a generic error message for other errors
    return {
      success: false,
      error: true,
      message: 'An unexpected error occurred while updating the event.',
    };
  }
};

export const deleteEvent = async (id: number) => {
  try {
    const deleteEvent = await prisma?.event.delete({
      where: { id },
    });
    console.log(deleteEvent);
    return {
      success: true,
      error: false,
      message: 'Event deleted Successfully.',
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: true,
      message: error,
    };
  }
};
