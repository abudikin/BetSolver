export class CreateDisputeDto {
    title?: string;
    description?: string;
    stake?: string;
    deadline?: Date;
    status?: 'pending' | 'active' | 'completed'; // Опционально, т.к. есть значение по умолчанию
  }