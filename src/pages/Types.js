import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { 
    addCategoryAction, 
    addCategoryFieldAction, 
    updateCategoryValueAction, 
    removeCategoryAction,
    removeCategoryFieldAction
} from '../actions/CategoryActions';
import { addItemCategoryAction } from '../actions/ItemActions';
import CategoryCard from '../components/CategoryCard';


const Types = () => {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categories);

    //Function to add a new Inventory type
    const onAddType = () => {
        const newType = {
            id: uuidv4(),
            name: '',
            heading: '',
            fields: [
                {
                    id: 1,
                    name: '',
                    type: 'text'
                }
            ]
        };
        
        dispatch(addCategoryAction(newType));
    }

    //Function for adding a new fields for a category type and updating the values for the fields
    const onAddCategoryField = (newFields, id, newField, catName) => {
        dispatch(addCategoryFieldAction(newFields, id));
        dispatch(addItemCategoryAction(newField, catName));
    }

    //Function for updating the values of an inventory type
    const onUpdateCategoryField = (id, fieldType, fieldValue) => {
        dispatch(updateCategoryValueAction(id, fieldType, fieldValue));
    }

    //Function for removing a specific Inventory type
    const onRemoveCategory = (id, name) => {
        dispatch(removeCategoryAction(id, name));
    }

    //Function for removing a specific field under an Inventory type
    const onRemoveCategoryField = (id, fieldId, catName) => {
        dispatch(removeCategoryFieldAction(id, fieldId, catName));
    }

    const rendercategories = categories.categories.length > 0 ? (
        categories.categories.map((category) => {
            return (
                <Col md={4} className='column' key={category.id}>
                    <CategoryCard
                        id={category.id}
                        name={category.name}
                        heading={category.heading}
                        fields={category.fields}
                        onAddCategoryField={onAddCategoryField}
                        onUpdateCategoryField={onUpdateCategoryField}
                        onRemoveCategory={onRemoveCategory}
                        onRemoveCategoryField={onRemoveCategoryField}
                    />
                </Col>
            )
        })
    ) : null;

    return (
        <Container className='container'>
            <Row className='show-grid'>
                {rendercategories}
                <Col md={4} className='column'>
                    <Button variant='secondary' style={{ width: '100%' }} onClick={onAddType}>Add Type</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Types;