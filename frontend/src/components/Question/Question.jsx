// src/components/Question.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Question.module.css"
import CircularProgress from '../../Includes/CircularBar/CircularBar'
import Button from "../Button/Button"
import './checkBoxstyles.css'

const Question = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const questions = [
    {
      questionText: 'Which of the following is a supervised machine learning algorithm?',
      options: ['K-Means', 'Random Forest', 'DBSCAN', 'Apriori'],
      answers: ['Random Forest'],
    },
    {
      questionText: 'Which protocol is used for secure communication over a computer network?',
      options: ['FTP', 'HTTP', 'SSL', 'SMTP'],
      img:'https://asianetbroadband.in/wp-content/uploads/2023/09/computer-networking-devices.jpg',
      answers: ['SSL'],
    },
    {
      questionText: 'In object-oriented programming, which of the following refers to the concept of a class taking on multiple forms?',
      options: ['Abstraction', 'Inheritance', 'Polymorphism', 'Encapsulation'],
      answers: ['Polymorphism'],
    },
    {
      questionText: 'Which SQL statement is used to retrieve unique values from a table?',
      options: ['SELECT DISTINCT', 'SELECT UNIQUE', 'SELECT ONLY', 'SELECT DIFFERENT'],
      answers: ['SELECT DISTINCT'],
    },
    {
      questionText: 'Which of the following is not a NoSQL database?',
      options: ['MongoDB', 'Cassandra', 'SQLite', 'Couchbase'],
      answers: ['SQLite'],
    },
  ];
  const handleOptionChange = (option) => {
    setSelectedAnswers((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((selected) => selected !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };
  

  const handleNextQuestion = () => {
    const correctAnswers = questions[currentQuestionIndex].answers;
    const isCorrect = selectedAnswers.length === correctAnswers.length &&
      selectedAnswers.every((answer) => correctAnswers.includes(answer));
  
    if (isCorrect) {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
  
        if (currentQuestionIndex + 1 === questions.length) {
          navigate('/result', { state: { score: newScore, total: questions.length } });
        }
  
        return newScore;
      });
    }
  
    // Move to the next question
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedAnswers([]); // Reset for the next question
    } else if (!isCorrect) {
      navigate('/result', { state: { score, total: questions.length } });
    }
  };
  
  

  return (
    <div className={`${styles.question_page}`}>

        {/* Style Header */}
        <div className={`${styles.header_container}`}>
          <img src='images/upper_header.svg' alt='upperHeaderImage'></img>
        </div>
      {/* Question Progress Bar */}
        <div className={`${styles.question_module}`}>

            <div className={`${styles.question_index}`}>  
            <CircularProgress progress={currentQuestionIndex} total={5} />  
        </div>  
      {/* Question */}

          <div className={`${styles.question_box}`}>
          <p>{questions[currentQuestionIndex].questionText}</p>
          </div>

          {/* Image */}
          {/* Image */}
            {questions[currentQuestionIndex].img && (
              <div className={`${styles.Image_selection}`}>
                <img src={questions[currentQuestionIndex].img} alt="Question related" />
              </div>
            )}

          

          {/* Options */}
          <div className={`${styles.options}`}>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index} className={`${styles.option} `}>
              <input  type="checkbox"
                      id={`option-${index}`}
                          name="option"
                          value={option}
                          checked={selectedAnswers.includes(option)}
                          onChange={() => handleOptionChange(option)}
                        />
                <label htmlFor={`option-${index}`}>{option}</label>

              </div>
          ))}
</div>


          
          <div className={`${styles.button_container}`}  
           onClick={handleNextQuestion} 
           disabled={!selectedAnswer}>


              <Button text={"Next"} isSubmit={false} /> 
          </div>  

        </div>
      
    </div>
  );
};

export default Question;
