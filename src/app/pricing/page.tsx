// src/components/PricingSection.tsx
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      description: "Essential face recognition attendance for small teams",
      features: [
        "Up to 70 registered faces",
        "Basic attendance reports",
        "7-day data retention",
        "Standard support"
      ],
      popular: false,
      buttonText: "Get Started"
    },
    {
      name: "Pro",
      price: "$19.99",
      description: "Advanced features for growing organizations",
      features: [
        "Up to 200 registered faces",
        "Advanced analytics dashboard",
        "Email notifications",
        "30-day data retention",
        "CSV/Excel exports",
        "Priority support"
      ],
      popular: false,
      buttonText: "Contact"
    },
    {
      name: "Enterprise",
      price: "$30+",
      description: "Custom solutions for large organizations",
      features: [
        "Everything in Pro with customizations",
        "As per needs"
      ],
      popular: false,
      buttonText: "Contact Sales"
    }
  ];

  return (
    <div className="py-16 bg-background">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg">
            Choose the perfect plan for your attendance tracking needs.
            All plans include our cutting-edge face recognition technology.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className={`border ${plan.popular ? 'border-primary' : 'border-border'} flex flex-col`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </div>
                  {plan.popular && (
                    <Badge className="bg-primary text-white">Popular</Badge>
                  )}
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">/ month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4">
                <Button className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}>
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mt-2">
            Need a custom solution? <a href="googldhruv@gmail.com" className="text-primary hover:underline">Contact us</a> for custom pricing.
          </p>
        </div>
      </div>
    </div>
  );
}