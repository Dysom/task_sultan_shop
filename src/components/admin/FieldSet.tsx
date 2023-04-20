import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import type { FieldSetProps } from '../../types';
import { clearFormError, setPreviewImageSrc } from '../../slices/adminSlice';

export const FieldSet = (props : FieldSetProps) => {

    const dispatch = useDispatch();
    const adminPageState = useSelector((state: RootState) => state.adminPage);
  
    const isErrorField = props.formError && props.errorFieldName === props.fieldName;
  
    const defaultValueString = props.fieldValue ? props.fieldValue.toString() : '';    
    const defaultValueOriginalType = props.fieldValue;
  
    let fieldElement : any;  
    
    const conditionAttrs : any = {};

    let additionalElements = (<></>);
  
    const onInput = (event : React.FormEvent) => {
        if(isErrorField) {
            dispatch(clearFormError());            
        }

        if(props.fieldName === 'imageUrl') {
          dispatch(setPreviewImageSrc(`/images/goods/` + (event.target as any).value));
        }
    }

    if(props.readonly) {
        conditionAttrs.readOnly = props.readonly;
    }    
  
    if(props.fieldType === 'select') {
      const selectOptions = props?.selectOptions ? props?.selectOptions : [];
  
      fieldElement = <>
        <select onChange={onInput} {...conditionAttrs} name={props.fieldName} defaultValue={defaultValueString}>
            {
              selectOptions.map((opt, index) => (
                <option key={props.fieldName + '_' + index} value={opt[0]}>{opt[1]}</option>
              ))
            }          
        </select>
      </>
    }
    else if(props.fieldType === 'multi-select') {
      const multiSelectOptions = props?.multiSelectOptions ? props?.multiSelectOptions : [];

      const defaultValue = (defaultValueOriginalType ? defaultValueOriginalType : []) as number[];

      fieldElement = <>
        <select onChange={onInput} multiple {...conditionAttrs} name={props.fieldName}>
            {
              multiSelectOptions.map((opt, index) => (
                defaultValue.includes(index) ? 
                <option selected key={props.fieldName + '_' + index} value={index}>{opt}</option> :
                <option key={props.fieldName + '_' + index} value={index}>{opt}</option>
              ))
            }          
        </select>
      </>
    }
    else {

      if(props.fieldName === 'imageUrl') {
        // dispatch(setPreviewImageSrc(`/images/goods/` + (props.fieldValue as string)));

        // console.log('adminPageState.goodsPreviewImageSrc', adminPageState.goodsPreviewImageSrc);

        additionalElements = (
          <>
            <div className='admin-page-form__image-wrapper'>
              <img alt={props.fieldValue as string} src={adminPageState.goodsPreviewImageSrc} />
            </div>
          </>
        );
      }
      fieldElement = <input onInput={onInput} {...conditionAttrs} name={props.fieldName} type='text' defaultValue={defaultValueString} placeholder={props.placeholder} />;
    }
  
    return (
      <>
        {additionalElements}
        <fieldset className='admin-page-form__fieldset'>
          <label className='admin-page-form__label'>{props.fieldLabel}</label>
          <span className='admin-page-form__field-wrapper'>            
              {fieldElement}
              {(isErrorField && <div className="admin-page-form__note">{props.errorNote}</div>)}
          </span>
        </fieldset>
      </>
    );
  };