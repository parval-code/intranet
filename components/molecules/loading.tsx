import { DotLoader } from 'react-spinners';

interface ILoading {
    name?: string;
}

const Loading = (props: ILoading) => {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <div className="d-flex items-center justify-center min-h-screen">
                    <div>
                        <DotLoader color="#F4B80E" />
                        <br />
                        <p className={" text-lg text-gray-600 "}>
                            { props.name ? props.name :  'Cargando...'}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Loading;
