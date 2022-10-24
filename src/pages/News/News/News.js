import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from 'react-icons/fa';

const News = () => {
    const newsData = useLoaderData();
    const { title, image_url, author, details, rating, category_id } = newsData;
    return (
        <Card >
            <Card.Img variant="top" src={image_url} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <div className='d-flex justify-content-around align-items-center'>
                    <p><span className='fw-semibold'>Author: </span>{author?.name}</p>
                    <p><span className='fw-semibold'>Published_Date : </span>{author?.published_date}</p>
                    <p className='d-flex align-items-center'>
                        <FaStar className='text-warning me-1'></FaStar>
                        <span>{rating?.number}</span>
                    </p>
                </div>
                <Card.Text>
                    {details}
                </Card.Text>
                <Link to={`/category/${category_id}`}>
                    <Button variant="primary">All News in this Category</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default News;