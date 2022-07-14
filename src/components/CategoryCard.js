import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const CategoryCard = ({ id, name, heading, fields, onAddCategoryField, onUpdateCategoryField, onRemoveCategory, onRemoveCategoryField }) => {

    const onCategoryValuesChange = (e, id, fieldType) => {
        onUpdateCategoryField(id, fieldType, e.target.value);
    }

    const onFieldValuesChange = (e, fieldId, fieldType, id) => {
        if (fieldType === 'type' && e.target.value === 'remove') {
            onRemoveCategoryField(id, fieldId, name);
        } else {
            const index = fields.findIndex((field) => field.id === fieldId);
            const newFields = [...fields];
            newFields[index][fieldType] = e.target.value;
            const newField = newFields[index];
            newField.value = '';
            onAddCategoryField(newFields, id, newField, name);
        }
    }

    const onAddFieldClick = (e, type, id) => {
        e.preventDefault();
        const newFields = [...fields];
        const newFieldId = newFields[newFields.length - 1]['id'] + 1;
        const newField = {
            id: newFieldId,
            name: '',
            type
        };
        newFields.push(newField);
        newField.value = '';
        onAddCategoryField(newFields, id, newField, name);
    }

    return (
        <Card className='card'>
            <Card.Header className='card-header'>
                <span>{name}</span>
                <span className='close-icon' onClick={() => onRemoveCategory(id, name)}>x</span>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className='form-group'>
                        <Form.Label>Object Type</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => onCategoryValuesChange(e, id, 'name')} />
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label>Object Title</Form.Label>
                        <Form.Select value={heading} onChange={(e) => onCategoryValuesChange(e, id, 'heading')}>
                            {fields.map((field) => {
                                return (
                                    <option key={field.id} value={field.name}>{field.name}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className='form-group'>
                        <Form.Label>Fields</Form.Label>
                        {fields.map((field) => {
                            return (
                                <InputGroup className="mb-3" key={field.id}>
                                    <Form.Control type="text" value={field.name} onChange={(e) => onFieldValuesChange(e, field.id, 'name', id)} />
                                    <Form.Select onChange={(e) => onFieldValuesChange(e, field.id, 'type', id)} value={field.type}>
                                        <option value="text">Text</option>
                                        <option value="number">Number</option>
                                        <option value="date">Date</option>
                                        <option value="remove">Remove</option>
                                    </Form.Select>
                                </InputGroup>
                            )
                        })}
                    </Form.Group>
                    <DropdownButton className='dropdown' id="dropdown-item-button" title="Add More Fields" variant='secondary'>
                        <Dropdown.Item as="button" onClick={(e) => onAddFieldClick(e, 'text', id)}>Text</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={(e) => onAddFieldClick(e, 'number', id)}>Number</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={(e) => onAddFieldClick(e, 'date', id)}>Date</Dropdown.Item>
                    </DropdownButton>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default CategoryCard;

