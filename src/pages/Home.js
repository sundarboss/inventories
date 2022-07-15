import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import ItemCard from '../components/ItemCard';
import { addItemAction, updateItemAction, removeItemAction } from '../actions/ItemActions';

const Home = () => {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categories);

    const items = useSelector((state) => state.items);

    //Function to add a new Inventory item
    const onAddItem = (e, catName) => {
        e.preventDefault();
        const selectedCategory = categories.categories.find((category) => category.name === catName);

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

    //Function to update the fields in an inventory item based on the item id
    const onUpdateItemField = (id, fieldName, fieldValue) => {
        dispatch(updateItemAction(id, fieldName, fieldValue));
    }

    //Function to remove an inventory item based on the item id
    const onRemoveItem = (id) => {
        dispatch(removeItemAction(id));
    }

    const renderItems = items.items.length > 0 ? (
        items.items.map((item) => {
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
                    <DropdownButton className='dropdown' id="dropdown-item-button" title="Add Item" variant='secondary'>
                        {categories.categories.map((category) => {
                            return (
                                <Dropdown.Item 
                                    key={category.id} 
                                    as="button" 
                                    onClick={(e) => onAddItem(e, category.name)}
                                >
                                    {category.name}
                                </Dropdown.Item>
                            )
                        })}
                    </DropdownButton>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;