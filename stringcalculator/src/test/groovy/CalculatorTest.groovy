import spock.lang.Specification
import spock.lang.Unroll

class CalculatorTest extends Specification {

    Calculator calculator;

    void setup(){
        calculator = new Calculator(100, -100);
    }

    def "length of Spock's and his friends' names"() {

        expect:
        name.size() == length

        where:
        name     | length
        "Spock"  | 5
        "Kirk"   | 4
        "Scotty" | 6
    }

    @Unroll
    def "add #a to #b returns #result"() {

        expect:
        calculator.add(a,b) == result

        where:
        a | b | result
        2 | 2 | 4
        3 | 4 | 7
    }

    def "add 3 to 4 returns 7"() {

        when:
        int result = calculator.add(3, 4)

        then:
        result == 7
    }

    def "substract 3 to 5 returns 2"(){

        expect:
        calculator.substract(5, 3) == 2

    }

    @Unroll
    def "substract #a to #b returns #result"() {

        expect:
        calculator.substract(b, a) == result

        where:
        a | b | result
        3 | 5 | 2
        5 | 3 | -2
    }

    def "substract 5 to 3 returns -2"(){

        expect:
        calculator.substract(3, 5) == -2

    }

    def "substract numbers not exceding the limits"(){

        expect:
        calculator.substract(100, 100) == 0
    }

    def "substract numbers exceding the lower limit throw an exception"(){

        when:
        calculator.substract(0, 101)

        then:
        thrown OverflowException
    }

    def "get limit values"(){

        expect:
        100 == calculator.upperLimit()
        -100 == calculator.lowerLimit()

    }

}