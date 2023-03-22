import * as Yup from "yup";
import { VALIDATION_MESSAGES } from "../../../assets/utils/constants";

export const FILE_FORMAT: string[] = [
  "расширение файла .csv с разделителем запятая;",
  "первый столбец должен быть индексом и в header не иметь названия (аналог index_col=0 в pandas);",
  "ориентация файла: столбцы - это признаки, строки - это наблюдения;",
  "все непрерывные признаки должны быть числами с точкой (например, 50.0), все дискретные должны быть строками или целыми числами без точки;",
  "не более 5000 наблюдений.",
];

export const validationSchema = Yup.object().shape({
  display_name: Yup.string().required(VALIDATION_MESSAGES.required),
  description: Yup.string().required(VALIDATION_MESSAGES.required),
});
