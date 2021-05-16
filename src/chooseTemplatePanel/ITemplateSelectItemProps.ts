export interface ITemplateSelectItemProps {
    name: string
    id: number
    onChange?: (id: number, checked: boolean) => void
}