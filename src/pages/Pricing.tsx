import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out our tools',
    features: [
      '10 AI tool uses per day',
      'Basic video editing',
      'Standard image processing',
      'Community support',
      'Watermarked exports',
    ],
    color: '#4ecdc4',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For professionals and creators',
    features: [
      'Unlimited AI tool uses',
      'Advanced video editing',
      'High-resolution exports',
      'Priority processing',
      'No watermarks',
      'Priority support',
      'API access',
    ],
    color: '#00d4ff',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For teams and businesses',
    features: [
      'Everything in Pro',
      'Custom AI model training',
      'Dedicated account manager',
      'SLA guarantee',
      'On-premise deployment',
      'White-label solution',
      'Volume discounts',
    ],
    color: '#ffd700',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 200px)',
      padding: '48px 24px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Simple, Transparent Pricing
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.7)',
          }}>
            Choose the plan that fits your needs
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {plans.map((plan) => (
            <div
              key={plan.name}
              style={{
                background: plan.popular ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${plan.popular ? plan.color : 'rgba(255, 255, 255, 0.1)'}`,
                borderRadius: '24px',
                padding: '40px',
                position: 'relative',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = `0 16px 48px ${plan.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {plan.popular && (
                <div style={{
                  position: 'absolute',
                  top: '-16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: plan.color,
                  color: 'white',
                  padding: '8px 24px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                }}>
                  Most Popular
                </div>
              )}

              <h3 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                marginBottom: '12px',
              }}>
                {plan.name}
              </h3>

              <div style={{ marginBottom: '16px' }}>
                <span style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: plan.color,
                }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{
                    fontSize: '16px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginLeft: '8px',
                  }}>
                    {plan.period}
                  </span>
                )}
              </div>

              <p style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '32px',
              }}>
                {plan.description}
              </p>

              <ul style={{
                listStyle: 'none',
                marginBottom: '32px',
              }}>
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '16px',
                      fontSize: '16px',
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      background: `${plan.color}30`,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Check size={16} style={{ color: plan.color }} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button style={{
                width: '100%',
                background: plan.popular ? `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)` : 'rgba(255, 255, 255, 0.1)',
                border: plan.popular ? 'none' : '2px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                if (plan.popular) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${plan.color}60`;
                } else {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (plan.popular) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                } else {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}>
                {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
