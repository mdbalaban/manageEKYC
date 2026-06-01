export const KycRequestTypeEnum = {
  Individual: 1,
  Company: 2,
}
export const KycRequestTypeEnumList = [
  {
    id: KycRequestTypeEnum.Individual,
    name: 'أفراد',
  },
  {
    id: KycRequestTypeEnum.Company,
    name: 'شركات',
  },
]

export function KycRequestTypeEnumToTextPublic(kycRequestTypeEnum) {
  return KycRequestTypeEnumList.find((pred) => pred.id == kycRequestTypeEnum)?.name
}
