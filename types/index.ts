export type ContractorType = {
    id: number;
    name: string;
    email: string;
    specialities: SpecialitiesType[];
    dayrate: number;
    availability: boolean;
    color: string;
    isSelected?: boolean;
}


export type SpecialitiesType = {
    id: number;
    contractorId: ContractorType['id'];
    key: string;
    value: string;
}

export type SearchModel = {
    open: boolean;
    handleFilterModel: () => void;
    data: ContractorType[]
}