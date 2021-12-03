import { isIE } from 'react-device-detect';

export const styles = {
    mainContainer: {
        backgroundColor: isIE ? "#000" : 'rgba(0,0,0,85%)',
        width: '100%',
        padding: '5px 0px',
        height: 'auto',
        position: 'fixed',
        bottom: 0,
        zIndex: 1
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    },
    defaultText: {
        fontSize: 12,
        fontWeight: 'bold',
        textDecoration: 'none',
        color: '#fff',
    },
    textStyle: {
        width: 120
    }
}