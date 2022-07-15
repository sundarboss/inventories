import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const ItemCard = ({ id, type, heading, fields, onUpdateItemField, onRemoveItem }) => {

    //Function to generate the correct Title for an Inventory Item
    const getHeading = (head) => {
        const selectedIndex = fields.findIndex((field) => field.name === head);
        return selectedIndex > -1 ? fields[selectedIndex].value : '';
    }

    const onItemValuesChange = (e, id, fieldName) => {
        onUpdateItemField(id, fieldName, e.target.value);
    }

    const onItemRemove = () => {
        onRemoveItem(id);
    }

    return (
        <Card className='card'>
            <Card.Header className='card-header'>
                <span>{`${type} - ${getHeading(heading)}`}</span>
                <span className='close-icon' onClick={onItemRemove}>x</span>
            </Card.Header>
            <Card.Body>
                <Form>
                    {fields.map((field) => {
                        return (
                            <Form.Group key={field.id} className='form-group'>
                                <Form.Label>{field.name}</Form.Label>
                                <Form.Control 
                                    type={field.type} 
                                    value={field.value} 
                                    onChange={(e) => onItemValuesChange(e, id, field.name)} 
                                />
                            </Form.Group>
                        )
                    })}
                </Form>
            </Card.Body>
        </Card>
    )
}

export default ItemCard;

