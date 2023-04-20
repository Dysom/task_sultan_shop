import type { InputFields } from "../types";

export const adminFormFieldsDate: Array<InputFields> = [
  {
    fieldType: "text",
    fieldName: "imageUrl",
    placeholder: "Задайте абсолютный или относительный путь",
    errorNote: "Поле заполнено некорректно",
    fieldLabel: "Url картинки:",
  },
  {
    fieldType: "text",
    fieldName: "name",
    placeholder: "Введите название товара",
    errorNote: "Поле заполнено некорректно",
    fieldLabel: "Название:",
  },
  {
    fieldType: "select",
    fieldName: "quantityType",
    errorNote: "Поле заполнено некорректно",
    fieldLabel: "Тип размера:",
    selectOptions: [
      ["weight", "Вес"],
      ["volume", "Объем"],
    ],
  },
  {
    fieldType: "number",
    fieldName: "quantity",
    placeholder: "Задайте объем или вес",
    errorNote: "Поле заполнено некорректно",
    fieldLabel: "Размер:",
  },
  {
    fieldType: "multi-select",
    fieldName: "typesOfCare",
    errorNote: "Поле заполнено некорректно",
    fieldLabel: "Типы ухода:",
    multiSelectOptions: [
      "Стирка",
      "Для мытья посуды",
      "Гигиена",
      "Для Мытья рук",
    ],
    allowEmpty: true,
  },
  {
    fieldType: "number",
    fieldName: "barCode",
    readonly: true,
    fieldLabel: "Штрихкод:",
  },
  {
    fieldType: "text",
    fieldName: "manufacturer",
    placeholder: "Задайте производителя",
    errorNote: "Поле заполнено некорректно",
    fieldLabel: "Производитель:",
  },
  {
    fieldType: "text",
    fieldName: "brand",
    placeholder: "Задайте бренд",
    errorNote: "Поле заполнено некорректно",
    fieldLabel: "Бренд:",
  },
  {
    fieldType: "text",
    fieldName: "description",
    allowEmpty: true,
    placeholder: "Введите описание товара",
    errorNote: "Поле заполнено некорректно",
    fieldLabel: "Описание:",
  },
  {
    fieldType: "number",
    fieldName: "price",
    placeholder: "Введите цену",
    errorNote: "Поле заполнено некорректно",
    fieldLabel: "Цена:",
  },
];
