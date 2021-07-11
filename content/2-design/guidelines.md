---
title: 2.2. General Design Guidelines
geekdocCollapseSection: true
---

Apart from the issues with code in a dynamic question, there also a few general things to consider when designing and writing a question. The guidelines below can be split into 3 main groups, and in summary they are to: 

1. Consider **Context**: What the question is used for
2. Consider **Formatting**: How the question is viewed
3. Consider **Wording + Detail**: How the question will be understood

While I'll go into detail for each part, **the key idea above all of this is to use common sense!** When in doubt, place yourself in the position of a student answering these questions, and whether you would find them confusing or unfair. 

<!-- When in doubt, consider what would be most helpful for the students answering these questions. -->

## 2.2.1. Context

It's important to take into account how the questions you're writing will be used - this will help with a lot of design decisions you make. 

{{<hint info>}}
Just a bit of background on the idea for these dynamic questions: 

Currently, the idea is that they'll be used in admissions tests for students from Year 7 to 10. 

<!-- We're hoping we can further generalise this format so that they can be used to make customisable maths assessments, but that's a topic to discuss later. -->

For each year group, the test will have 30 question 'slots', each reserved for a particular topic. Each question slot will be filled with 1 of the 3 dynamic questions for that topic. 
{{</hint>}}

The bottom line is that a lot of randomisation will be involved when dynamic questions are used to generate assessments and tests. As a result, it's important to ensure that questions are consistent in difficulty and style so that we can maintain fairness of testing. 

With that said, here are a few guidelines that will help you with designing these questions: 

1. **Consider the target audience of your questions, and set bounds for the difficulty of your questions.**

    - Searching for topics with a specific **year group** or [**key stage**](https://en.wikipedia.org/wiki/Key_Stage) can be very useful in understanding what students of a particular age might be learning. You might even find some example questions that you can use for inspiration! 
    
      <img src="https://i.imgur.com/jAxdp89.png" width="300px"/>

      > BBC Bitesize is generally a good resource to see what level of questions you want to ask - there are many other good websites out there as well!

    - The bounds you set might involve topics to avoid or terminology that is too advanced. This helps keep the difficulty of your questions consistent. 
      - For example, with terminology, it may be more appropriate to ask for "area under a graph" rather than "solving a definite integral".

2. **Try to generate values easy to work with, and keep descriptions short and succinct.** 
   
    - Consider the solving conditions of your questions: 

      - Students are generally going to be **allowed calculators**, but questions should be **solvable without one**. The main focus isn't the calculation, but rather the method of approaching and solving a problem.
        > Simpler calculations will also make it easier to check your own questions!

      - Students will be given on average **2 minutes per question** - this includes the time involved in reading and understanding the content. Questions should be clear and solution process generally should not be longer than a minute.
        > The main work involved with solutions should also be relevant to the question itself - unfortunately, with the question below, the time it takes to count values would be more important than understanding the what the mode is!
        >
        > <img src="https://i.imgur.com/vpGYr5t.png" width="400px"/>

3. **Use terms and contexts that can be understood, regardless of nationality or (pop) culture.** 
   
    - We'd like the tests to be applicable to all students around the world, so you may need to consider doing the following: 

      - Define terms that are specific to a particular country/area. 
        > For example, not everyone will immediately understand the relationship between 'nickels', 'dimes' and 'quarters' when used in a question, as these are specific to the US currency. 

      - Provide relatable context in questions (where applicable). 
        > Not everyone will understand that "[Yasuo's](https://leagueoflegends.fandom.com/wiki/Yasuo/LoL) Q does `20 + 100% AD` damage at level 1"! It's fine to add references for 'flavour' in your questions, but they shouldn't impede the process of solving the question. 
    
---

## 2.2.2. Formatting

The guidelines below involve using the tools available to present your questions in a format that's consistent and easily understandable. 

4. **Use AsciiMath on relevant numbers and any algebraic expressions.**
   
    - These help emphasise important parts of the question, and keep the appearance of expressions consistent. 

5. **Consider including a diagram when it makes wording the question much easier.**

    - Usually happens with questions on geometry. If describing the question feels  too lengthy or complicated, then a diagram can help students understand the question much faster.
  
    - Note that there are exceptions to this rule - in some cases, you may want to intentionally avoid using a diagram as part of the difficulty of the question, so that students will need to visualise the situation themselves. 

    > **Important Note:** Please keep in mind that your diagram should be clear and used by your question! Try to keep diagrams simple and small; they should be no bigger than **500px by 500px**. 

---

## 2.2.3. Wording + Detail

These guidelines are about how question text and solutions can be written to make it more likely that your questions are understood and solved as intended by students.

6. **Emphasise important or unusual information in questions - especially if it's about the form of your answer.**

    - A fair question should not be aiming to 'catch out' someone for misreading slight details.
   
    - If a question is open-answer, make sure to note the **unit** you want students to answer in (if applicable), or **how many significant figures** to round to. 
      > Note the specific way the question below asks for the answer, regarding both units and rounding - this makes it clear for students how to provide their answers in the open-response format.
      > 
      > <img src="https://i.imgur.com/KZP6Kop.png" width="400px">
      > 
      > (Note also that the question gives a specific conversion between inches and cm for students to use, respecting the context; on the other hand, 12 inches to 1 foot is presumed knowledge of the imperial system.)
  
    - Try to be consistent on how you achieve emphasis - specific question wording, the order in which you give information, or by bolding text.  

7. **Solutions should describe both the general solving process and perform the specific calculation to arrive at the answer.**

    - These solutions will be read by the students themselves when doing practice, so it's important they can be understood from the perspective of someone who cannot answer the question.
  
    - Ideally, students should be able to figure out why they answered incorrectly after they read the solution. Step-by-step calculations help a lot - you should do these for the important or complicated parts of your question.

      > As an example, consider the following statement in a solution:
      > 
      > ```
      > "The amount for expenses is 15% of $850, so $722.5 remains."
      > ```
      > 
      > Multiple steps are done in a single statement, and it's also never shown or explained where the '$722.5' value came from. 
      >
      > **Note that in some cases, this is fine** - if it is only a small part of the question and other complex steps are involved, we can assume students will fill in the gaps. 
      > 
      > However, for other cases, we'd probably want to include more detail. First a calculation to first show `100% - 15% = 85%` of the money is not spent, and so `$850 * 85% = $722.50` remains.
  
    - With multiple-choice questions, you may need to explain why other multiple-choice options were wrong.

      - This applies to questions where the correct option doesn't imply the other options are wrong - something like "select the following number that is prime", for example. \
      Just because one option has a prime number, it doesn't automatically mean the other numbers won't be prime!