import {makeStyles,} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 50px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    heading: {
        color: 'rgba(140, 212, 173)',
        fontFamily: 'American Typewriter, serif',
        fontWeight: '500',
        textDecoration: 'none'
    },
    image: {
        marginLeft: '10px',
        marginTop: '5px',
    },
    logOut: {color: 'white'},
    signIn: {color: 'white'},

    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
        },
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            marginTop: 20,
            justifyContent: 'center',
        },
    },
    logout: {
        marginLeft: '20px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },
    brandContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    [theme.breakpoints.down('sm')]: {

        mainContainer: {
            flexDirection: 'column-reverse'
        }
    }
}));
