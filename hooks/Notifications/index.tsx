import React, { 
    createContext, 
    useContext, 
    ReactNode, 
    useState 
} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface INotification {
    message: string;
    type: 'success' | 'error' | 'info';
}

interface INotificationContext {
    showNotification: (message: string, type: 'success' | 'error' | 'info') => void;
    notification: any;
}

const NotificationContext = createContext<INotificationContext | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notification, setNotification] = useState<INotification | null>(null);

    const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
        setNotification({ message, type });
        toast(message ? message : '', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: type,
            theme: "light",
        })
    };

    return (
        <>
            <NotificationContext.Provider value={{ showNotification, notification }}>
                {notification && (
                    <>
                        <ToastContainer />
                    </>
                )}
                {children}
            </NotificationContext.Provider>
        </>
    );
};

export const useNotification = (): INotificationContext => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
