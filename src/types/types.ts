export interface CustomNotes {
    id: number;
    content: string;
}

export interface Exclusion {
    step: Step;
}

export interface Step {
    id: number;
    title: string;
    content: string;
    link: string;
    type: string;
    price: number;
    oldPrice: number;
    item: Item;
}

export interface Item {
    id: number;
    iName: string;
}

export interface Bill {
    id: number;
    payments: Payment[];
    products: Product[];
}

export interface Payment {
    id: number;
    total: number;
    status: string;
    timestamp: string;
}

export interface Product {
    id: number;
    pName: string;
    description: string;
    price: string;
}

export interface UserData {
    id: number;
    uName: string;
    email: string;
    role: string;
    bills: Bill[];
    exclusions: Exclusion[];
}
