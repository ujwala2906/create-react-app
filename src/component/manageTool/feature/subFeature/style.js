import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const CloseButton = styled.div`
.container {
    position: relative;
    width: 100%;
    max-width: 400px;
  }
  
  .container .btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    color: white;
    font-size: 16px; 
    border: none;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
  }

  .container .bt {
    position: absolute;
    top: 40%;
    left: 40%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    color: white;
    font-size: 16px; 
    border: none;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
  }
  
  .container .btn:hover {
    color: black
  }

  .activeBox {
    border: 1px solid blue;
  }
 
`;


export { useStyles, CloseButton };