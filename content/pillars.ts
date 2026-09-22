export type PillarBodyBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export type Pillar = {
  slug: string;
  title: string;
  teaser: string;
  body: PillarBodyBlock[];
};

const p = (text: string): PillarBodyBlock => ({ type: "p", text });
const list = (items: string[]): PillarBodyBlock => ({ type: "list", items });

export const pillars: Pillar[] = [
  {
    slug: "organizational",
    title: "Organizational Model",
    teaser:
      "A fully connected and highly functional team requires all levels to know and understand their job as well as all their teammate's jobs. By creating and documenting the processes and procedures required of each team, we are able to cross train and better understand how our jobs intersect with our teammate's jobs.",
    body: [
      p(
        "Our Organizational Model is a servant-leadership model of a collaborative organization that operates in a learning environment with connected teams, healthy relationships and healthy individuals.",
      ),
      p(
        "This pillar represents the heart of your organization, the people. It is also the pillar that drives the culture of the organization. There are 4 core concepts when looking at this model:",
      ),
      list([
        "The right people in the right seats",
        "Cultural alignment of each person to the organization",
        "The relationship between the individual and others in your organization",
        "Level of engagement by the individual.",
      ]),
      p(
        'We have all heard "get the right people in the right seats", but as business leaders it\'s easy to miss what that actually means. Everyone knows the mantra, but most don\'t know how to make it happen. There is a simple process for making sure you hire the right people for your organization. You can have amazing people in your organization but if you do not have them in the positions that fits with who they are naturally, they will continue to struggle.',
      ),
      p(
        "Culture is what drives people's behavior. Having cultural alignment in your company ensures that the behavior of the whole organization is working towards the common goal.",
      ),
      p(
        "Relationships are key. Individual strengths that cannot be assimilated well into the organization produce little value. Learn how to measure the relationship strength score in your organization.",
      ),
      p(
        "Organizational team health is determined by measuring the health and strength of the individuals and the relationships between them as a team. The factors that make up the individual score are SME (Subject Matter Expertise), GRIT (the Get it Done Factor) and EH (Emotional Health). When you combine these with the team factors of Empowerment and Friction, you can then determine the overall team health score. Corland Partners has developed a very simple process to measure this.",
      ),
      p(
        "Employment engagement is a core metric that should be measured by every company. Each employee in the company is either engaged, not engaged or actively disengaged.",
      ),
      p(
        "Engaged employees work with passion and feel a profound connection to their company. They drive innovation and move the organization forward.",
      ),
      p(
        "Not engaged employees are essentially checked out and sleep walking through their day. They are putting in time, but not energy or passion into their work.",
      ),
      p(
        "Actively disengaged employees aren't just unhappy at work they are busy acting out their unhappiness. Every day these workers undermine what their engaged coworkers accomplish.",
      ),
      p(
        "According to a Gallup poll in 2014, 80% of the workers worldwide and 70% of workers in the U.S. are either not engaged or actively disengaged. If you are one of the 30% of engaged employees you know how frustrating it is when the majority of your coworkers are less committed to their jobs.",
      ),
      p(
        "In companies with low engagement rates, this frustration often causes high turnover of top talent, since these people quickly realize they are carrying the weight alone.",
      ),
      p(
        "The costs of low engagement are not limited to turnover recruitment. Gallup found that actively disengaged employees cost the U.S. approximately $500 billion dollars a year. This does not take into account your not-engaged employees.",
      ),
      p(
        "Here in lies our opportunity. Just taking your organization from the average 30% of actively engaged employees to 70% will put you in the top 1% in your niche industry in profitably, desirable work environment and ability to compete.",
      ),
    ],
  },
  {
    slug: "operational",
    title: "Operational Model",
    teaser:
      "The EOS model (Entrepreneurial Operating System®) Model by Gino Wickman is the model CP will recommend for the operating model. This model can be tailored to any size business and provides a common language for all coaches to cross train and deliver consistent results.",
    body: [
      p(
        "Every company has an operating model that is perfectly calibrated to produce the results that you are currently getting. If you want different results you will need to change or tweak your operating model.",
      ),
      p(
        "Corland Partners has adopted the EOS® (Entrepreneurial Operating System®) as our operating model of choice. This is a simplified version of the internationally recognized operating model ISO 9000. The EOS Model® as presented by Gino Wickman breaks down the ISO 9000 model into a very simple and accessible model, perfect for medium to small companies. He describes this process in his book Traction. Furthermore, the web-based Traction® Software makes implementing this model very accessible for organizations of any size.",
      ),
      p("The EOS Model® is based on the following 6 components:"),
      list(["Vision", "People", "Data", "Issues", "Processes", "Traction"]),
      p("All of these are required to create a healthy operating model."),
      p(
        "EOS® provides the structure for implementing this operating model. This process contains the following steps:",
      ),
      p(
        "Start with a 90-minute meeting followed by a Focus Day™. You will then need a 2-day Vision Building™ session to create the annual plan that will be reviewed quarterly.",
      ),
      p(
        "EOS® provides a toolbox with a complete set of tools. These are designed to address and strengthen all six of the key components of your business. They are designed to be easy to learn and use, because complexity reduces effectiveness. In addition, every tool in the EOS Toolbox™ has been proven in actual business scenarios. All of the tools are in the toolbox because it's the best for that particular key business component.",
      ),
      p(
        "The EOS Model® connects well with our organizational model through the accountability chart. EOS® can be self-implemented or by hiring either a Professional EOS Implementer® or a Certified EOS Implementer®.",
      ),
    ],
  },
  {
    slug: "financial",
    title: "Financial Model",
    teaser:
      "A simple financial model contains 4 key components. Understanding this simple structure allows you to easily navigate any accounting software in setting up your financial model to meet the specific needs of your company.",
    body: [
      p("Our simplified Financial Model contains 4 key components:"),
      list([
        "Structured Chart of Accounts for Income and Expenses and the Balance Sheet",
        "Defined KPI's for each line in the chart of accounts",
        "3-5-year projection budget for the Income and Expenses, Balance Sheet and Cash Flow statements",
        "Documented Reporting for all metrics to meet requirements of operations, accounting and banking relationships",
      ]),
      p(
        "Understanding this simple structure allows you to easily navigate any accounting software in setting up your financial model to meet the specific needs of your company.",
      ),
      p(
        "To make this financial model functional and easily accessible for your company, you need to think through two components:",
      ),
      list([
        "The system and processes to gather the inputs",
        "A way to deal with all the outputs, as mentioned in point 2 and 4, understanding our KPIs and creating the reporting package.",
      ]),
      p(
        "For this Corland Partners uses a Business Intelligence tool called Fathom HQ to enhance and simplify the user experience, and to provide greater clarity into every financial aspect in your company.",
      ),
      p(
        "Utilizing the tools inside Fathom allows for in-depth analysis, reports, bench-marking and metrics to help assess your company's profitability, cash flow, growth and other key performance indicators. In addition, Traction contains a Scorecard that synchronizes with the Financial Model.",
      ),
    ],
  },
  {
    slug: "marketing-sales",
    title: "Marketing and Sales Model",
    teaser:
      "A comprehensive marketing model consists of the following stages: Awareness, Consideration, Sales/Decision, Fulfillment, and Customer Service. Each of these stages have numerous touch points that all tie back into a cohesive marketing message.",
    body: [
      p(
        'Having the right Marketing and Sales Model is essential to your organization\'s ability to reach its revenue goals. At Corland Partners we like to say "The world belongs to marketing, everyone else just lives in it." Your marketing message should be the guardian over each touch-point of the customer\'s journey.',
      ),
      p(
        "Corland Partners created the Marketing Flywheel, after carefully studying companies like Amazon and the work of authors like Simon Sinek on Understanding the Why, and Donald Miller's work on brand development known as Story Brand.",
      ),
      p(
        "Our Marketing and Sales Model has clearly defined stages of the customer experience categorized as:",
      ),
      list([
        "Awareness",
        "Consideration",
        "Sales/Decision",
        "Fulfillment",
        "Customer Service",
      ]),
      p("The awareness stage is all about identifying the problem or opportunity."),
      p("The consideration stage is to focus on possible solutions."),
      p(
        "Sales and Decision stage is when the customer chooses the provider to solve their problem.",
      ),
      p(
        "Fulfillment stage is where the customer receives the service or product from the provider it chose.",
      ),
      p(
        "And finally, the Customer service stage is where you follow-up with a customer survey on their experience and clearly communicate all points of contact for support and gathering raving fan testimonials to use in future marketing.",
      ),
      p(
        "We implement this model based on the buyer's personas and the typical buyer's journey. The customer should experience the same level of excellence through all 5 stages. They should never feel they have been handed off to another company with a different culture. The most crucial transition points in the model for the customers are leaving the sales/decision stage and entering the Fulfillment stage or leaving fulfillment and entering the customer service stage.",
      ),
    ],
  },
];

export function getPillarBySlug(slug: string): Pillar | undefined {
  return pillars.find((pillar) => pillar.slug === slug);
}
