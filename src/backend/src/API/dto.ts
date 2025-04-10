export class CreateDisputeDto {
    title: string;
    description: string;
    wager: number;
    participants: number[]; // Массив ID пользователей
    arbitrators: number[]; // Массив ID арбитров
    timer: number; // Таймер в минутах
  }
  
  // update-dispute.dto.ts
  export class UpdateDisputeDto {
    winnerId?: number; // ID победителя
    status?: string; // Новый статус спора
    evidence?: string[]; // Массив ID доказательств
  }