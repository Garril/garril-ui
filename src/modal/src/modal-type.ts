import { ExtractPropTypes, PropType } from 'vue'

export const modalProps = {} as const
export type ModalProps = ExtractPropTypes<typeof modalProps>
