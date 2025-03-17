export type Role = 'ADMIN' | 'SPORT_OWNER' | 'USER';

export type BookingStatus = 'PENDDING'|'ACCEPT'|'REJECT'|'CANCEL'|'FINISH'|'EXPIRED'|'ONGOING';

export type Gender = 'MALE'|'FEMALE';



export interface Booking {
    id: number,
    bookingDate: Date,
    bookingStatus: BookingStatus,
    timeStatus: string,
    merchantId: number,
    user: number,
    field_id: number,
    matchId: Number,
    updatedAt: Date,
    createdAt: Date,
}

export interface User {
    id: number,
    ref:string,
    name:string,
    phone:string,
    passcode:string,
    gender:Gender,
    dob:Date
}