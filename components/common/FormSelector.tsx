import React from 'react';
import styled,{css} from 'styled-components';
import palette from '../../styles/palette';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { UseControllerProps, useController } from 'react-hook-form';
import { ErrorContainer } from './FormInput';
import {  authForm } from '../../types/auth';

const Container = styled.div`
    width:100%;
    height:40px;
    select {
        width: 100%;
        height: 100%;
        background-color: white;
        border: 1px solid ${palette.gray_eb};
        font-size: 16px;
        padding: 0 11px;
        border-radius: 10px;
        outline: none;
        -webkit-appearance: none;
        background-image: url("/static/svg/common/selector/selector_down_arrow.svg");
        background-position: right 11px center;
        background-repeat: no-repeat;
        &:focus {
        border-color: ${palette.dark_cyan};
        }
  }
`

interface FormSelectorProps {
    options?: string[];
    disabledOptions?: string[];
    name: string;
  }

  const FormSelector: React.FC<FormSelectorProps & UseControllerProps<authForm>> = ({
        options = [],disabledOptions = [],
        control,name,rules = {},
    }) => {
        const { field: { value, ...inputProps },fieldState: { error },
        } = useController({ control,name,rules,});
    return (
      <Container>
        <select {...inputProps}>
          {disabledOptions.map((option,index) => (
            <option key={index} value="none" disabled selected>
              {option}
            </option>
          ))}
          {options.map((option,index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ErrorContainer>
          <p>{error?.message}</p>
        </ErrorContainer>
      </Container>
    );
  };
  
  export default React.memo(FormSelector);