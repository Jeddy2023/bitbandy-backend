export interface SendEmailDto {
    email: string;
    ticketNumber: string;
    eventTitle: string;
    imageUrl: string;
    eventTimeStart: string;
    eventTimeEnd: string;
    ticketCode: string;
    location: string;
    eventDate: string;
}

export interface SendCustomerEmailDto {
    email: string;
    firstName: string;
    lastName: string;
    message: string
}