import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import ItemCard from '../components/ItemCard';
import { addItemAction, updateItemAction, removeItemAction } from '../actions/ItemActions';
import { useParams } from 'react-router-dom';

const Random = () => {
    const { category } = useParams();

    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categories);

    const items = useSelector((state) => state.items);

    const filteredItems = items.items.filter((item) => item.type === category)

    const onAddNewItem = (e) => {
        e.preventDefault();
        const selectedCategory = categories.categories.find((cat) => cat.name === category);

        const newItemFields = selectedCategory.fields.map((field) => {
            const newField = {};
            newField.id = field.id;
            newField.name = field.name;
            newField.type = field.type;
            newField.value = "";
            return newField;
        });

        const newItem = {
            id: uuidv4(),
            type: selectedCategory.name,
            heading: selectedCategory.heading,
            fields: newItemFields
        };

        dispatch(addItemAction(newItem));
    } 

    const onUpdateItemField = (id, fieldName, fieldValue) => {
        dispatch(updateItemAction(id, fieldName, fieldValue));
    }

    const onRemoveItem = (id) => {
        dispatch(removeItemAction(id));
    }

    const renderItems = filteredItems.length > 0 ? (
        filteredItems.map((item) => {
            return (
                <Col md={4} className='column' key={item.id}>
                    <ItemCard 
                     id={item.id}
                     type={item.type}
                     heading={item.heading}
                     fields={item.fields}
                     onUpdateItemField={onUpdateItemField}
                     onRemoveItem={onRemoveItem}
                    />
                </Col>
            )
        })
    ) : null;

    return (
        <Container className='container'>
            <Row className='show-grid'>
                {renderItems}
                <Col md={4} className='column'>
                    <Button variant='secondary' style={{ width: '100%' }} onClick={onAddNewItem}>Add Item {category}</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Random;