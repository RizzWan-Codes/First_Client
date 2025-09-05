import express from "express";
import fetch from "node-fetch"; // if using Node 18+, native fetch works
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = "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"; // replace with your key

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a chatbot that answers all questions in the fewest words possible, very concise, two to three sentences if possible, without losing meaning. This website is about burgers. Only answer questions related to burger buisness (includes delivery, quality of ingridients, justify high prices etc). Heres your training data: Burgers Best-Sellers: Chicken Hero . ₹180 Minced chicken patty, Hero sauce, lettuce, tomato, onion, cheese. Cheesy Chicken . ₹220 Crispy fried chicken, cheesy sauce, cheddar cheese slice, garlic aioli. Mr. India . ₹200 Crunchy Masala-Veg patty, burger sauce, crisp veggies, sliced cheddar. Veggie Burger . ₹160 Veggie patty, burger sauce, sliced cheddar, lots of veggies. Veggie Hero . ₹120 Veggie patty, Hero sauce, lettuce, tomato, onion, cheese. Butter-Chicken . ₹220 Crispy fried chicken, Makhani sauce, Laccha Pyaaz, exotic veggies. (Grill: +₹30) Naga Naga . ₹240 Hot n spicy fried chicken, Fiery Hot Napalm sauce, pickles, exotic veggies. Extra spicy! The American Dream . ₹240 Buttermilk-fried chicken, zesty burger sauce, crisp veggies, sliced cheddar & grilled onions. Mogambo . ₹200 Crunchy Masala Veg patty, Napalm sauce, pickles, exotic veggies. Extra spicy! Swiss Mushroom . ₹200 Creamy mushroom patty, cheesy sauce, cheese, exotic veggies. Aloha! . ₹240 Minced chicken patty, grilled pineapple, BBQ flavor, exotic veggies. K-Pop Chicken . ₹240 Crispy fried chicken coated in Korean sauce, creamy coleslaw. Mama Mia! . ₹240 Thick & crispy paneer patty, red Italian sauce, cheddar, fresh vegetables, basil hint. Paneer Makhani . ₹240 Crispy paneer, Makhani sauce, Laccha Pyaaz, exotic veggies. (Grill: +₹10) Mexican Bean . ₹200 Authentic red bean patty, crunchy nachos, salsa, exotic veggies. Sliders: Fried Chicken . Hero ₹100, Cheesy ₹120, Inferno ₹140 Grilled Chicken . Makhani ₹140, Teriyaki ₹150 Veggie . Hero ₹80, Cheesy ₹100, Inferno ₹120 K-Pop Paneer . ₹240 Crispy paneer coated in Korean sauce, creamy coleslaw. Special Burger: Grilled Teriyaki . ₹280 Grilled Teriyaki chicken, caramelized onions, fried egg, cheddar slice, BBQ flavors. Sides Cheese Pops . ₹100/150 Crispy balls of cheese, served with ketchup. Classic Fries . ₹100.120 Crispy golden fries, ketchup. Salted ₹100, Piri Piri ₹120, Chili Garlic ₹120 Chicken Pops . ₹120.200 Crispy buttermilk fried chicken pops, burger sauce. (+₹10 for hot & spicy style) Crispy Chicken Fingers . ₹120/230 Crispy buttermilk fried chicken fingers, burger sauce. (+₹10 for hot & spicy style, 3pc/6pc) Salads Grilled Chicken Salad . ₹260 Lettuce, tomatoes, exotic veggies, fresh herbs & spices, healthy seeds, choice of 2 dressings. Grilled Paneer Salad . ₹260 Lettuce, tomatoes, exotic veggies, fresh herbs & spices, healthy seeds, choice of 2 dressings. Dressing Options: Honey Mustard, Sweet Chilli, Vinaigrette, Napalm, Garlic Aioli, Salsa Salad Extras: Grilled Chicken ₹60 Grilled Paneer ₹80 Grilled Pineapple ₹40 Olives ₹20 Egg ₹40 Beverages Cold Drink Can . ₹50 Passion Fruit Iced Tea . ₹100 Peach Iced Tea . ₹100 Mixed-Berry Iced Tea . ₹100 Coco-Loco Smoothie . ₹160 Classic Chocolate Shake . ₹160 Cold Coffee . ₹120 Ginger Honey Lemon (hot) . ₹80 Dessert Hot Choco-lava . ₹80 Choco-lava with Icecream . ₹120 Burger Toppings Artisanal Cheese (Smoked Cheddar/Gouda/Emmental) . ₹40 Fried Egg . ₹40 Dips . ₹20 Extra Toppings . ₹20 Meal Offers Single Burger Meal (1 Fries + 1 Soft Drink) . ₹120 Double Burger Meal (1 Fries + 2 Soft Drinks) . ₹160 Add a dessert . ₹50 Change drink to iced tea . ₹50"
          },
          { role: "user", content: message }
        ],
        max_tokens: 50 // limits response length to save tokens
      }),
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Oops! Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
