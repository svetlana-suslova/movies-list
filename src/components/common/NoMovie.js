import noMovie from '../../assets/no-movie.png';
import styled from 'styled-components';

const Styled = styled.div`
    font-size: 18px;
    color: red;
    margin: 10px 0;
    text-align: center;
    img {
        width: 200px;
        height: auto;
        border: 1px solid rgba(0,0,0,0.1);
    }
`;

const NoMovie = () => {
    return (
        <div className="row justify-content-center">
            <Styled className="flex-column">
                <img src={noMovie} alt="No movie"/>
                <div>No movies</div>
            </Styled>
        </div>
    );   
}
export default NoMovie;