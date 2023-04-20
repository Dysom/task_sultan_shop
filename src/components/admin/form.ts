import { adminFormFieldsDate } from '../../data/adminFormFields';
import type { GoodsItem } from '../../types';
import { setFieldToItem } from '../../utils'

export function validateForm(form : HTMLFormElement) {
  
    for(const fieldItem of adminFormFieldsDate) {
        if(fieldItem.readonly) {
          continue;
        }

        let fieldElement = form[fieldItem.fieldName];

        if(fieldElement) {
          
          if(!fieldItem.allowEmpty && fieldElement.value === '') {              
            
            return fieldItem.fieldName;
          }

          if(fieldItem.fieldType === 'number') {
              if(isNaN(parseFloat(fieldElement.value))) {
                                  
                return fieldItem.fieldName;
              }
          }
        }
    }

    return null;
}

export function formToGoodsItem(form : HTMLFormElement, goodsItem : GoodsItem) {
  
    for(const fieldItem of adminFormFieldsDate) {
        if(fieldItem.readonly) {
          continue;
        }

        let fieldElement = form[fieldItem.fieldName];

        if(fieldElement) {
          if(fieldItem.fieldType === 'multi-select') {
            let fieldValue : Array<number> = [];

            Array.from((fieldElement as HTMLSelectElement).options).forEach((element, index) => {
              if(element.selected) {
                fieldValue.push(index);
              }
            });

            setFieldToItem(fieldItem.fieldName, fieldValue, goodsItem);
          }
          else {
            setFieldToItem(fieldItem.fieldName, fieldElement.value, goodsItem);
          }
        }
    }
}