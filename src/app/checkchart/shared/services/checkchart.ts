export class Patient {
    an: string;
    hn: string;
    fullname: string;
    fullage: string;
    admDateTime: Date;
    dischargeDateTime: Date;
    defaultRightCode: string;
    defaultRightName: string;
    activeWard: string;
    activeWardName: string;
    diagnosisStatusType: number;
    diagnosisStatusTypeName: string;
    dischargeCode: string;
    dischargeName: string;
    dischargeDoctor: string;
    dischargeDoctorName: string;
    los: number;
}

export class PatientMultiSaveItem {
    an: string;
    receivebyuser: string;
    receivebyposition: number;
}

export class Checkchart {
    id:number;
    an: string;
    receivebyuser: string;
    receivebyusername: string;
    receivebydatetime: Date;
    receivebyposition: number;
    receivebypositionname: string;
    receivebypositionlocalname: string;
    sendtouser: string;
    sendtousername: string;
    sendtoposition: number;
    sendtopositionname: string;
    sendtopositionlocalname: string;
    sendtodatetime: Date;
    sendtobyuser: string;
    sendtobyusername: string;
    cxlbyuser: string;
    cxlbyuserdatetime: Date;
    cxlbyuserreason: number;
}

export class deleteCheckchartLog {
    id:number;
    sendtodatetime: Date;
    cxlbyuser: string;
    cxlbyuserreason: number;
}

export class Doctor {
    doctor: string;
    fullname: string;
}

export class Audit {
    id: string;
    hn: string;
    an: string;
    fullname: string;
    doctor: string;
    doctormaster: string;
    doctorconsult: string;
    category: string;
    ward: string;
    nurse: string;
    coder: string;
    rwbefore: number;
    rwafter: number;
    los: number;
    entrybyuser: string;
}