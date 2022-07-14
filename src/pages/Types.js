import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CategoryCard from '../components/CategoryCard';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { addCategoryAction, addCategoryFieldAction, updateCategoryValueAction, removeCategoryAction } from '../actions/CategoryActions';

/*const categories = [
    {
        id: 456,
        name: 'Bulldozer',
        heading: 'Title',
        fields: [
            {
                id: 1,
                name: 'Title',
                type: 'text'
            }
        ]
    },
    {
        id: 567,
        name: 'Excavator',
        heading: 'Title',
        fields: [
            {
                id: 1,
                name: 'Title',
                type: 'text'
            },
            {
                id: 2,
                name: 'Brand',
                type: 'text'
            },
            {
                id: 3,
                name: 'Capacity',
                type: 'number'
            }
        ]
    }
]*/

const Types = () => {
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.categories);

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

    const onAddCategoryField = (newFields, id) => {
        dispatch(addCategoryFieldAction(newFields, id))
    }

    const onUpdateCategoryField = (id, fieldType, fieldValue) => {
        dispatch(updateCategoryValueAction(id, fieldType, fieldValue));
    }

    const onRemoveCategory = (id, name) => {
        dispatch(removeCategoryAction(id, name));
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