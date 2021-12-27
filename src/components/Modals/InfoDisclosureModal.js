import { Button, Modal, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import React from "react";
import {connect, useDispatch} from "react-redux";

import { closeModal } from "../../actions/disclosureModalActions";


const useStyles = makeStyles((theme) => ({
    paper: {
        width: '70vw',
        backgroundColor: "whitesmoke",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'scroll'
      },
    button: {
        fontSize:"14px",
        backgroundColor:"#0055B7",
        color:"white",
    },
    spacing: {
        marginBottom:'16px',
        fontSize:"16px",
    }
}));

function InfoDisclosureModal(props){
    const {disclosureModalStatus} = props;
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeModal());
    };

    const classes = useStyles();

    const body = (
        <div className={classes.paper}>
            <h2 id="share-modal-title">
                Personal Information Disclosure
            </h2>
            <div id="share-modal-body">
                <Typography align={'left'} variant="subtitle1" className={classes.spacing}>
                    This app amalgamates information about events, blogs, news and clubs in order to provide information you may be interested in. In order to show you information relevant to your interests, we need some information about you. Completing the form is entirely voluntary; if you choose not to provide further information, the recommendations will simply be less personalized.
                </Typography>

                <Typography align={'left'} variant="subtitle1" className={classes.spacing}>
                    We are committed to protecting your privacy.  Any information you choose to provide will be used solely for the purpose of this app. It will not be shared with third parties, and it will be stored securely in an environment controlled by UBC.
                </Typography>
                <Typography align={'left'} variant="subtitle1" className={classes.spacing}>
                    You can alter your entries at any time, and can delete them entirely, should you wish to do so.
                </Typography>
            </div>
            <Button className={classes.button} autoFocus color="inherit" onClick={handleClose}>
                Close
            </Button>
        </div>
    );

    return (
        <div>
            <Modal
                className={classes.modal}
                open={disclosureModalStatus}
                aria-labelledby="share-modal-title"
                aria-describedby="share-modal-des"
            >
                {body}
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        disclosureModalStatus: state.disclosureModalStatus
    };
};


export default connect(mapStateToProps, null)(InfoDisclosureModal)