"use client";
import React, { useEffect, useState } from "react";

const MainComponent = () => {
  const tabs = ["Bullish", "Bearish", "Rangebound", "Volatile"];

  const dateArray = [
    "24-Apr-2024",
    "02-May-2024",
    "09-May-2024",
    "31-May-2024",
    "21-Jun-2024",
  ];

  const strategyArray = [
    {
      View: "Bullish",
      Value: {
        "24-Apr-2024": [
          "Bull Call Spread",
          "Bull Put Spread",
          "Bull Put Spread",
          "Long Call",
          "Bull Put Spread",
          "Bull Call Spread",
          "Strategy1",
          "Bull Call Spread",
          "Strategy1",
          "Strategy1",
          "Spread-Strategy",
          "Bull Call Spread",
        ],

        "02-May-2024": [
          "Bull Call Spread",
          "Bull Call Spread",
          "Bull Put Spread",
          "Long Call",
          "LongCall",
          "Long Call",
          "Bull Put Spread",
          "Bull Call Spread",
          "Strategy1",
          "Bull Call Spread",
          "Strategy2",
          "Strategy1",
          "Strategy2",
          "Bull Call Spread",
        ],
        "09-May-2024": [
          "Strategy Put",
          "Strategy Call",
          "Strategy Call",
          "Strategy Call",
          "Strategy Put",
        ],
      },
    },
    {
      View: "Bearish",
      Value: {
        "24-Apr-2024": [
          "Bear Call Spread",
          "Bear Call Spread",
          "Bear Call Spread",
          "Long Put",
          "LongPut",
          "Long Put",
          "Bear Call Spread",
        ],
        "31-May-2024": [
          "Long Put",
          "Long Put",
          "Long Put",
          "Long Put",
          "Long Put",
        ],
        "21-Jun-2024": [
          "Strategy3",
          "Strategy3",
          "Bear Put Spread",
          "Strategy3",
          "Long Put",
          "LongPut",
        ],
      },
    },
    {
      View: "RangeBound",
      Value: {
        "24-Apr-2024": [
          "Short Straddle",
          "Short Strangle",
          "Short Strangle",
          "Iron Butterfly",
          "Short Strangle",
          "Short Straddle",
          "Strategy1",
          "Short Straddle",
          "Strategy1",
          "Strategy1",
          "Spread-Strategy",
          "Short Straddle",
        ],

        "02-May-2024": [
          "Short Straddle",
          "Short Straddle",
          "Short Strangle",
          "Iron Butterfly",
          "Iron Butterfly",
          "Iron Butterfly",
          "Short Strangle",
          "Short Straddle",
          "Strategy1",
          "Short Straddle",
          "Strategy2",
          "Strategy1",
          "Strategy2",
          "Short Straddle",
        ],
        "21-Jun-2024": [
          "Iron Condor",
          "Iron Butterfly",
          "Iron Butterfly",
          "Iron Butterfly",
          "Iron Condor",
        ],
      },
    },
    {
      View: "Volatile",
      Value: {
        "02-May-2024": [
          "Long Straddle",
          "Long Strangle",
          "Long Strangle",
          "Long Strangle",
          "Long Straddle",
          "Strategy1",
          "Long Straddle",
          "Strategy1",
          "Strategy1",
          "Spread-Strategy",
          "Long Straddle",
        ],
        "09-May-2024": [
          "Long Straddle",
          "Long Straddle",
          "Long Strangle",
          "Long Strangle",
          "Long Straddle",
          "Strategy1",
          "Long Straddle",
          "Strategy2",
          "Strategy1",
          "Strategy2",
          "Long Straddle",
        ],
        "31-May-2024": [
          "Long Straddle",
          "Long Strangle",
          "Long Strangle",
          "Long Strangle",
          "Long Straddle",
        ],
      },
    },
  ];

  const [activeTab, setActiveTab] = useState("Bullish");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dateArray[0]);

  const [strategies, setStrategies] = useState([]);

  const updateStrategies = () => {
    const strategyObject: any = strategyArray.find(
      (strategy: any) => strategy.View === activeTab
    );
    if (strategyObject && strategyObject.Value[selectedDate]) {
      const strategies = strategyObject.Value[selectedDate];
      const strategyCount: any = {};

      strategies.forEach((strategy: any) => {
        if (strategyCount[strategy]) {
          strategyCount[strategy]++;
        } else {
          strategyCount[strategy] = 1;
        }
      });

      setStrategies(strategyCount);
    } else {
      setStrategies([]);
    }
  };

  useEffect(() => {
    updateStrategies();
  }, [selectedDate, activeTab]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectDate = (date: any) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  console.log("data", strategies, selectedDate, activeTab);

  return (
    <>
      <div className="tabs-container">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="dropdown-container">
        <div className="dropdown-header" onClick={toggleDropdown}>
          <span>{selectedDate}</span>
          {/* <a className={ `arrow-icon ${isOpen ? "open" : ""}` }>
            <span className="left-bar"></span>
            <span className="right-bar"></span>
          </a> */}
          <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>
            &#x25B2;
          </span>
        </div>
        {isOpen &&
          dateArray.map((date: string) => (
            <>
              <div className="dropdown-list">
                <div className="dropdown-item" onClick={() => selectDate(date)}>
                  {date}
                </div>
              </div>
            </>
          ))}
      </div>

      <div className="strategies-container">
        {Object.entries(strategies).map(([strategy, count]) => (
          <div className="strategies-header" key={strategy}>
            <div> {strategy} </div>
            <div className="strategy-count">
              <span className="dot"></span>{count} strategies
            </div>

          </div>
        ))}

        {Object.entries(strategies).length == 0 && (
          <div className="noStrategies-container">
            <div> There are no strategies for </div>
            <div> {selectedDate} </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MainComponent;
