import { useMemo, useState } from "react";
import { ArrowRight, MapPin, Sparkles, X } from "lucide-react";
import india from "@svg-maps/india";

type StateSchemeInfo = {
  schemes: string[];
  description: string;
};

const stateSchemeData: Record<string, StateSchemeInfo> = {
  "Andhra Pradesh": {
    schemes: [],
    description: "Explore MSME support programmes available in Andhra Pradesh.",
  },

  "Arunachal Pradesh": {
    schemes: [
      "Arunachal Pradesh MSME Policy",
      "Start-up Arunachal",
      "Industrial Development & Investment Policy 2025",
    ],
    description:
      "State initiatives supporting MSMEs, startups and industrial investment.",
  },

  Assam: {
    schemes: [],
    description: "Explore MSME support programmes available in Assam.",
  },

  Bihar: {
    schemes: [],
    description: "Explore MSME support programmes available in Bihar.",
  },

  Chhattisgarh: {
    schemes: [],
    description: "Explore MSME support programmes available in Chhattisgarh.",
  },

  Delhi: {
    schemes: [],
    description: "Explore MSME support programmes available in Delhi.",
  },

  Goa: {
    schemes: [
      "Goa StartUp Policy – 2025",
      "Goa State Logistics & Warehousing Incentives Scheme – 2025",
    ],
    description:
      "Startup, logistics and business-support initiatives for enterprises in Goa.",
  },

  Gujarat: {
    schemes: [
      "Gujarat Industrial Policy 2020",
      "Gujarat MSME Policy 2019",
      "Gujarat Export Policy 2025",
    ],
    description:
      "Industrial, MSME and export incentives supporting business growth in Gujarat.",
  },

  Haryana: {
    schemes: [],
    description: "Explore MSME support programmes available in Haryana.",
  },

  "Himachal Pradesh": {
    schemes: [
      "Chief Minister's Startup / Innovation Projects",
      "Him Kukkut Palan Yojna",
    ],
    description:
      "Startup, innovation and enterprise-support initiatives available in Himachal Pradesh.",
  },

  Jharkhand: {
    schemes: [
      "Jharkhand MSME Policy 2023",
    ],
    description:
      "Investment, interest, certification and institutional support for MSMEs.",
  },

  Karnataka: {
    schemes: [
      "Karnataka Industrial Policy 2025–30",
    ],
    description:
      "Industrial incentives focused on investment, manufacturing, technology and regional development.",
  },

  Kerala: {
    schemes: [
      "Kerala Stressed MSMEs Revival & Rehabilitation Scheme",
      "KSIDC Seed Funding Loan Scheme",
      "MSME Scale-Up Mission",
      "Year of Enterprises 3.0",
    ],
    description:
      "Finance, revival, scale-up and entrepreneurship support for Kerala enterprises.",
  },

  "Madhya Pradesh": {
    schemes: [
      "Mukhyamantri Swarojgar Yojana",
      "Mukhya Mantri Yuva Udyami Yojana",
      "IT Investment Promotion Assistance Scheme",
    ],
    description:
      "Self-employment, youth entrepreneurship and technology investment support.",
  },

  Maharashtra: {
    schemes: [
      "Chief Minister Employment Generation Programme",
      "Maha MSME Project Loan Scheme",
      "Maha MSME Machinery & Equipment Scheme",
      "MSME Champions Scheme",
      "Maharashtra State Industrial Cluster Development Programme",
      "Subsidy & Incentive Scheme",
    ],
    description:
      "One of the richest state-level MSME ecosystems, covering finance, machinery, clusters and industrial incentives.",
  },

  Manipur: {
    schemes: [
      "Startup Manipur",
    ],
    description:
      "Startup and entrepreneurship support for businesses in Manipur.",
  },

  Meghalaya: {
    schemes: [],
    description: "Explore MSME support programmes available in Meghalaya.",
  },

  Mizoram: {
    schemes: [],
    description: "Explore MSME support programmes available in Mizoram.",
  },

  Nagaland: {
    schemes: [],
    description: "Explore MSME support programmes available in Nagaland.",
  },

  Odisha: {
    schemes: [
      "Odisha MSME Development Policy 2022",
    ],
    description:
      "Policy support for MSME development, investment and competitiveness.",
  },

  Punjab: {
    schemes: [
      "Punjab State MSME Policy 2023",
    ],
    description:
      "State-level MSME policy support for enterprise development in Punjab.",
  },

  Rajasthan: {
    schemes: [
      "iStart Rajasthan",
      "Rajasthan Investment Promotion Scheme 2024",
      "Rajasthan MSME Policy 2024",
      "RIICO Scheme",
      "MSME Innovation & Loan Scheme",
    ],
    description:
      "Startup, investment, industrial infrastructure and MSME financing support.",
  },

  Sikkim: {
    schemes: [
      "Skilled Youth Startup Scheme",
    ],
    description:
      "Startup and self-employment support for skilled youth in Sikkim.",
  },

  "Tamil Nadu": {
    schemes: [
      "Annal Ambedkar Entrepreneurship Development Scheme",
      "Kalaignar Kaivinai Thittam",
      "NEEDS",
      "Startup Village Entrepreneurship Programme",
    ],
    description:
      "Entrepreneurship, artisan, startup and rural-enterprise support across Tamil Nadu.",
  },

  Telangana: {
    schemes: [
      "T-IDEA Incentive Scheme",
      "TS-PRIDE",
    ],
    description:
      "Investment incentives and inclusive entrepreneurship programmes in Telangana.",
  },

  Tripura: {
    schemes: [
      "Tripura Industrial Investment Promotion Incentive Scheme",
    ],
    description:
      "Industrial investment and enterprise incentives for businesses in Tripura.",
  },

  "Uttar Pradesh": {
    schemes: [
      "Uttar Pradesh MSME Promotion Policy 2022",
      "Mukhyamantri Yuva Swarozgar Yojana",
    ],
    description:
      "MSME promotion, youth entrepreneurship and self-employment support.",
  },

  Uttarakhand: {
    schemes: [
      "Uttarakhand MSME Policy 2023",
    ],
    description:
      "State policy support for MSME investment and business development.",
  },

  "West Bengal": {
    schemes: [
      "Banglashree Scheme for MSMEs",
    ],
    description:
      "State-level fiscal incentives supporting manufacturing MSMEs.",
  },

  "Jammu and Kashmir": {
    schemes: [],
    description:
      "Explore MSME support programmes available in Jammu & Kashmir.",
  },

  "Dadra and Nagar Haveli": {
    schemes: [],
    description:
      "Explore MSME support programmes available in the Union Territory.",
  },

  "Daman and Diu": {
    schemes: [],
    description:
      "Explore MSME support programmes available in the Union Territory.",
  },

  Chandigarh: {
    schemes: [],
    description:
      "Explore MSME support programmes available in Chandigarh.",
  },

  Puducherry: {
    schemes: [],
    description:
      "Explore MSME support programmes available in Puducherry.",
  },

  Lakshadweep: {
    schemes: [],
    description:
      "Explore enterprise support programmes available in Lakshadweep.",
  },

  "Andaman and Nicobar Islands": {
    schemes: [],
    description:
      "Explore enterprise support programmes available in Andaman & Nicobar Islands.",
  },
};

function normalizeStateName(name: string) {
  return name
    .replace(/\s+/g, " ")
    .trim();
}

export function IndiaMap() {
  const [activeState, setActiveState] = useState<string | null>(null);

  const activeInfo = useMemo(() => {
    if (!activeState) return null;

    return (
      stateSchemeData[activeState] ?? {
        schemes: [],
        description: `Explore MSME schemes available in ${activeState}.`,
      }
    );
  }, [activeState]);

  const availableStates = india.locations.filter(
    (location) =>
      stateSchemeData[normalizeStateName(location.name)] !== undefined,
  );

  return (
    <section className="india-map-section">
      <div className="india-map-aurora pointer-events-none" />

      <div className="india-map-shell">
        {/* Top heading */}
        <div className="india-map-heading">
          <div>
            <div className="india-map-kicker">
              <Sparkles className="size-3.5" />
              STATE-WISE DISCOVERY
            </div>

            <h2 className="india-map-title">
              Find schemes <span>by state</span>
            </h2>

            <p className="india-map-description">
              Explore government support programmes available across India.
              Hover over a state to preview its key MSME schemes.
            </p>
          </div>

          <div className="india-map-status">
            <span className="india-map-status-dot" />
            {availableStates.length} regions mapped
          </div>
        </div>

        {/* Map + information card */}
        <div className="india-map-layout">
          <div className="india-map-visual">
            <div className="india-map-grid" />

            <div className="india-map-glow india-map-glow-one" />
            <div className="india-map-glow india-map-glow-two" />

            <div className="india-map-label india-map-label-north">
              NORTH
            </div>

            <div className="india-map-label india-map-label-south">
              SOUTH
            </div>

            <div className="india-map-label india-map-label-east">
              EAST
            </div>

            <div className="india-map-label india-map-label-west">
              WEST
            </div>

            <svg
              className="india-svg"
              viewBox={india.viewBox}
              role="img"
              aria-label="Interactive map of India showing state MSME schemes"
            >
              <defs>
                <linearGradient
                  id="indiaStateGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="var(--india-map-gold)" />
                  <stop offset="55%" stopColor="var(--india-map-violet)" />
                  <stop offset="100%" stopColor="var(--india-map-cyan)" />
                </linearGradient>

                <filter
                  id="indiaMapGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {india.locations.map((location) => {
                const stateName = normalizeStateName(location.name);
                const hasData = Boolean(stateSchemeData[stateName]);
                const isActive = activeState === stateName;

                return (
                  <path
                    key={location.id}
                    d={location.path}
                    tabIndex={hasData ? 0 : -1}
                    aria-label={stateName}
                    className={[
                      "india-state",
                      hasData ? "india-state-active" : "",
                      isActive ? "india-state-selected" : "",
                    ].join(" ")}
                    onMouseEnter={() => {
                      if (hasData) setActiveState(stateName);
                    }}
                    onFocus={() => {
                      if (hasData) setActiveState(stateName);
                    }}
                    onClick={() => {
                      if (hasData) setActiveState(stateName);
                    }}
                    onKeyDown={(event) => {
                      if (
                        hasData &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        setActiveState(stateName);
                      }
                    }}
                  />
                );
              })}
            </svg>

            {/* Scheme hotspots */}
            <div className="india-hotspot india-hotspot-delhi">
              <span />
              <small>Delhi</small>
            </div>

            <div className="india-hotspot india-hotspot-gujarat">
              <span />
              <small>Gujarat</small>
            </div>

            <div className="india-hotspot india-hotspot-maharashtra">
              <span />
              <small>Maharashtra</small>
            </div>

            <div className="india-hotspot india-hotspot-karnataka">
              <span />
              <small>Karnataka</small>
            </div>

            <div className="india-hotspot india-hotspot-tamil">
              <span />
              <small>Tamil Nadu</small>
            </div>

            <div className="india-hotspot india-hotspot-west-bengal">
              <span />
              <small>West Bengal</small>
            </div>
          </div>

          {/* Information card */}
          <aside
            className={[
              "india-state-card",
              activeState ? "india-state-card-visible" : "",
            ].join(" ")}
          >
            {activeState && activeInfo ? (
              <>
                <button
                  type="button"
                  className="india-state-close"
                  onClick={() => setActiveState(null)}
                  aria-label="Close state details"
                >
                  <X className="size-4" />
                </button>

                <div className="india-state-card-top">
                  <span className="india-state-pin">
                    <MapPin className="size-4" />
                  </span>

                  <div>
                    <p className="india-state-eyebrow">
                      STATE SCHEMES
                    </p>

                    <h3>{activeState}</h3>
                  </div>
                </div>

                <p className="india-state-card-description">
                  {activeInfo.description}
                </p>

                {activeInfo.schemes.length > 0 ? (
                  <div className="india-state-scheme-list">
                    {activeInfo.schemes.slice(0, 4).map((scheme, index) => (
                      <div
                        key={scheme}
                        className="india-state-scheme"
                        style={{
                          animationDelay: `${index * 70}ms`,
                        }}
                      >
                        <span className="india-state-scheme-dot" />

                        <span>{scheme}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="india-state-empty">
                    <Sparkles className="size-4 text-gold" />

                    <span>
                      State schemes are available for exploration.
                    </span>
                  </div>
                )}


                <p className="india-state-source">
                  Scheme information sourced from the MSME Council state-wise
                  scheme listings.
                </p>
              </>
            ) : (
              <div className="india-state-empty-state">
                <div className="india-state-empty-icon">
                  <MapPin className="size-5" />
                </div>

                <p className="india-state-empty-title">
                  Explore a state
                </p>

                <p className="india-state-empty-text">
                  Hover over a highlighted state on the map to see its key
                  MSME schemes.
                </p>
              </div>
            )}
          </aside>
        </div>

        {/* Bottom helper */}
        <div className="india-map-footer">
          <div className="india-map-footer-item">
            <span className="india-map-footer-dot india-map-footer-dot-gold" />
            State with scheme information
          </div>

          <div className="india-map-footer-item">
            <span className="india-map-footer-dot india-map-footer-dot-mint" />
            Hover / tap to explore
          </div>

          <span className="india-map-footer-hint">
            Built for MSMEs across Bharat
          </span>
        </div>
      </div>
    </section>
  );
}