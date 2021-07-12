import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    smMargin: {
        margin: theme.spacing(1),
    },
    actionDiv: {
        textAlign: 'center',
    },
    progressBar: {
        position: 'relative',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:'35%',
        paddingLeft:'10%'
    },
    cardRoot:{
        padding: '40px',

    }
}));
