import React, {useState, useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';

const DeliveryForm = ({itemID}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submissionAudio = useMemo(() => new Audio('./submission.mp3'), []);

    useEffect(() => {
        if (isSubmitted) {
            submissionAudio.play();
        }
    }, [isSubmitted, submissionAudio]);

    const onSubmit = async data => {
        setIsSubmitting(true);
        // Simulate a network request...
        await new Promise(resolve => setTimeout(resolve, 1000));
        // You would typically handle the form submission to the server here.
        console.log(data);
        setIsSubmitted(true);
        setIsSubmitting(false);
    };
    if (isSubmitted) {
        return (
            <div className="submission-confirmation">
                <h2>Delivery Scheduled</h2>
                <p>Your delivery details have been successfully submitted.</p>
                <p>We will take care of the rest!</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Delivery Details</h1>

            <label htmlFor="itemId">Item ID</label>
            <input
                id="itemId"
                {...register("itemId")} // Correct usage of register for react-hook-form v7+
                defaultValue={itemID}
                readOnly
            />

            <label htmlFor="name">Name</label>
            <input
                id="name"
                {...register("name", {required: true})} // Correct usage of register for react-hook-form v7+
            />
            {errors.name && <p>Name is required.</p>}

            <label htmlFor="phoneNumber">Phone Number</label>
            <input
                id="phoneNumber"
                {...register("phoneNumber", {required: true})} // Correct usage of register for react-hook-form v7+
            />
            {errors.phoneNumber && <p>Phone number is required.</p>}

            <label htmlFor="address">Address</label>
            <input
                id="address"
                {...register("address", {required: true})} // Correct usage of register for react-hook-form v7+
            />
            {errors.address && <p>Address is required.</p>}

            {/* Add additional fields for city, country, province, and postcode here */}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <span>Submitting...</span> : <span>Submit Delivery Details</span>}
            </button>
        </form>
    );
};

export default DeliveryForm;
