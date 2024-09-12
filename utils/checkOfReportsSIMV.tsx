

export const checkOfRecportsSIMV = (code: number, message: any, actions: any) => {
    if(code === 0){

        actions(message, 'success');

      } else if(code === 1) {

        actions(message, 'error');
          
      } else if(code === 2) {

        actions(message, 'info');
        
      } else if(code === 3) {

        actions(message, 'error');

      } else if(code === 4) {

        actions(message, 'info');

      } else if(code === 5) {

        actions(message, 'error');

      }  else if(code === 6) {

        actions(message, 'error');

      }  else if(code === 80) {

        actions(message, 'error');

    }  else if(code === 81) {

        actions(message, 'error');

    }  else if(code === 82) {

        actions(message, 'error');

    }  else if(code === 83) {

        actions(message, 'error');

    }  else if(code === 84) {

        actions(message, 'error');

    }  else if(code === 85) {

        actions(message, 'error');

    }  else if(code === 86) {

        actions(message, 'error');

    } else if(code === 87) {

        actions(message, 'error');

    }else if(code === 99) {

        actions(message, 'error');
        
    }
}