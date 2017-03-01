import org.junit.Before;
import org.junit.Test;
import tddkata.BowlingGame;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

public class BowlingBowlingGameTest {

    private BowlingGame game;

    @Before
    public void initialize(){
        game = new BowlingGame();
    }

    @Test
    public void can_roll(){
        game.roll(4);
    }

    @Test
    public void zero_game(){
        multipleRolls(20, 0);
        assertThat(game.score(), is(0));
    }

    private void multipleRolls(int totalRolls, int pins) {
        for (int roll = 0; roll < totalRolls; roll++) {
            game.roll(pins);
        }
    }

    @Test
    public void one_game(){
        multipleRolls(20, 1);
        assertThat(game.score(), is(20));
    }

    @Test
    public void two_game(){
        multipleRolls(20, 2);
        assertThat(game.score(), is(40));
    }

    @Test
    public void can_make_an_spare(){

        //when
        game.roll(5);
        game.roll(5);
        game.roll(3);
        multipleRolls(17, 0);

        //then
        assertThat(game.score(), is(16));
    }

    @Test
    public void can_make_2_consecutives_spares(){

        //when
        game.roll(5);
        game.roll(5);

        game.roll(5);
        game.roll(5);

        game.roll(3);
        multipleRolls(15, 0);

        //then
        assertThat(game.score(), is(31));
    }

    @Test
    public void can_make_an_strike(){

        //when
        game.roll(10);
        game.roll(3);
        game.roll(1);
        multipleRolls(16, 0);

        //then
        assertThat(game.score(), is(18));
    }

    @Test
    public void perfect_game(){
        multipleRolls(12, 10);
        assertThat(game.score(), is(300));
    }

}
