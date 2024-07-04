import React, {useState, useEffect, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';


import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://localhost:27777';
const CONTROLLER_URL = 'localhost:12222';


const DeliveryForm = ({id}) => {
    const {register, setValue, handleSubmit, formState: {errors}} = useForm();
    const [address, setAddress] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const submissionAudio = useMemo(() => new Audio('./submission.mp3'), []);

    const handleCheckoutWithWallet = async () => {
        //TODO: maybe we should pass the data related to the items which are about to be purchased
        //TODO: we need to interact with the mdec-controller via digital-wallet's backend (api folder)
        console.debug("CONTROLLER_URL", CONTROLLER_URL)
        const connectionInvitation = await axios.get(`http://${CONTROLLER_URL}/create-order`) //TODO: add order...
            .catch((error) => {
                console.error("Create Order (Connection Invitation) error >>", error)
            });
        //
        //@ts-ignore
        if (connectionInvitation.data) {
            //@ts-ignore
            console.debug("connectionInvitation.data", connectionInvitation.data)
            //@ts-ignore
            window.open("http://localhost:19006?data=" + JSON.stringify(connectionInvitation.data), '_blank');
        }

    };

    const {lastMessage} = useWebSocket(WS_URL, {
        onOpen: () => {
            console.debug('WebSocket connection established.');
        },
        onMessage: (msg) => {
            console.debug("msg", msg);
        }
    });

    useEffect(() => {
        if (lastMessage) {
            try {
                const data = JSON.parse(lastMessage.data)
                if (data.output && data.output.content) {
                    console.debug("data.output.content", data.output.content)
                    setValue('address', data.output.content.attribute, {shouldValidate: false});
                    setAddress(data.output.content.attribute)
                } else if (data.error) {
                    console.error("data.error", data.error)
                } else {
                    console.error("unknown data format", data)
                }
            } catch (e) {
                console.error(e)
            }
        }
    }, [lastMessage])

    const onSubmit = async data => {
        setIsSubmitted(true);
    };

    useEffect(() => {
        if (isSubmitted) {
            submissionAudio.play();
        }
    }, [submissionAudio, address]);

    if (isSubmitted) {
        return (
            <div className="submission-confirmation">
                <h2>Delivery Initiated</h2>
                <p>Your delivery details have been successfully submitted.</p>
                <p>We will take care of the rest!</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Delivery Details</h1>

            <label htmlFor="id">Order ID</label>
            <input
                id="id"
                {...register("id")}
                defaultValue={id}
                readOnly
            />

            <label htmlFor="address">Address</label>
            <input
                id="address"
                {...register("address", {required: true})}
                placeholder={"Selective disclosure"}
                readOnly
            />
            {errors.address && <p>Address is required.</p>}

            {!address && <button onClick={handleCheckoutWithWallet} type="button"><span>Proof of Address</span></button>}

            {address && <button type="submit"><span>Submit Delivery Details</span></button>}
        </form>
    );
};

export default DeliveryForm;
