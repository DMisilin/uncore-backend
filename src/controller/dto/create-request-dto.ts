export interface CreateRequestDto {
  userId: string,
  typeId: number,
  activityId: number,
  title: string,
  description: string,
  countryId: number,
  cityId: number
}