import { InputGroup, Form } from "react-bootstrap";

const InputRespuesta = ({activate, onChange, name , ref, nameRadio,onChangeTwo, inputRef, ...props}) => {
    return (
        <>
            <InputGroup>
                <Form.Control onChange={onChange} ref={inputRef} {...props} aria-label="Text input with radio button" />
                <InputGroup.Radio disabled={activate} name={nameRadio} onChange={onChangeTwo} aria-label="Radio button for following text input" />
            </InputGroup>
        </>
    );
}

export default InputRespuesta;