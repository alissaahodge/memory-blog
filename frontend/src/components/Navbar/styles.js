import {makeStyles,} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: 'rgba(140, 212, 173)',
        fontFamily: 'American Typewriter, serif',
        fontWeight: '500',
        textDecoration: 'none'
    },
    image: {
        marginLeft: '15px',
    },
    logOut: {color: 'white'},
    signIn: {color: 'white'},
    toolBar: {
        display: 'flex',
        justifyContent: 'flex-end !important',
        width: '400px',
        textAlign: 'right',
        alignItems: 'flex-end'
    }, profile: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
    },
    userName: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft:'30px',
        paddingRight:'57px'
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
