
import sentence_transformers
from sentence_transformers import SentenceTransformer, util

faq = {
    "How does the AI recommend careers?":
        "Our AI analyzes your skills, personality traits, values, and interests. It compares them against thousands of career paths using labor market data to find the best fit.",
        
    "Is my data safe?":
        "Yes, your data is encrypted and stored securely. We never share it without your consent, and you can request deletion anytime.",
        
    "Do you sell or share my data?": 
        "No, your data is encrypted and stored securely. We never share it without your consent, and you can request deletion anytime.",    

    "How accurate are the career matches?":
        "Our AI has a 97% accuracy rate based on follow-up surveys. The more information you provide, the better the results.",
        
    "Can I retake the assessment later?":
        "Yes! We encourage annual reassessment or whenever your interests or goals change. Previous results are saved for comparison.",
        
    "How is this better than other career tests?":
        "CareerCompass AI continuously learns from real-world data. It goes beyond matching to suggest career paths, required skills, salary data, and growth plans tailored to you.",

    "Can I use this if I'm in college?": 
        "Yes! Students and recent graduates are encouraged to use our platform to explore early career options.",
    
    "Is this free to use?": 
        "Yes, our basic career recommendation tool is free for all users.",
    
    "Will my information be kept private?": 
        "Yes, your data is encrypted and stored securely. We never share it without your consent, and you can request deletion anytime.",
    
    "Do you sell my data?": 
        "No. We do not sell your data. Your privacy is a top priority.",
    
    "How do you match me with jobs?": 
        "We use AI to analyze your personality, skills, values, and interests. It compares them against a database of career paths and job roles to find the best fit.",
    
    "What's different about your AI?": 
        "Our AI goes beyond skills by factoring in your personality, values, and goals. It also adapts to the latest job market data.",
    
    "Can I do the test again next year?": 
        "Yes! We encourage annual reassessment or whenever your interests or goals change. Previous results are saved for comparison.",
    
    "How good is your career match?": 
        "Our AI has a 97% accuracy rate based on follow-up surveys. The more information you provide, the better the results.",
    
    "Hello, I want to know more about careers in AI": 
        "We offer tailored recommendations for AI-related roles, depending on your skills and interests—ranging from data science to ethical AI design.",

}

class FAQBot:
    def __init__(self, model_path="chatbot-model/all-MiniLM-L6-v2", faq_dict=faq):
        self.model=SentenceTransformer(model_path)
        self.faq_dict=faq
        self.questions = list(self.faq_dict.keys())
        # pre-compute question embeddings
        self.embeddings = self.model.encode(self.questions)


    def get_answer(self,user_input, threshold=0.6):
        input_embedding = self.model.encode(user_input)
        scores = util.cos_sim(input_embedding, self.embeddings)[0]

        best_idx = scores.argmax()
        best_score = scores[best_idx].item()

        if scores[best_idx] >= threshold:
            return self.faq_dict[self.questions[best_idx]]
        return "I'm not sure how to respond to that. Could you rephrase it?"



