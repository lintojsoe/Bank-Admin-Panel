export interface User {
    id: number,
    profile_photo: string,
    first_name: string,
    last_name: string,
    email: string,
    personal_id: any,
    mobile_number: number,
    mobile_prefix: any,
    gender: number,
    address: Address
    account: Array<any>
}

export interface Address {
    country: string,
    city: string,
    street: string,
    zip_code: any
}
