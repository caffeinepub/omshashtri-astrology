import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Array "mo:core/Array";

actor {
  // Types
  type ZodiacSign = {
    name : Text;
    symbol : Text;
    dateRange : Text;
    element : Text;
    modality : Text;
    rulingPlanet : Text;
    description : Text;
  };

  module ZodiacSign {
    public func compare(zs1 : ZodiacSign, zs2 : ZodiacSign) : Order.Order {
      Text.compare(zs1.name, zs2.name);
    };
  };

  type Horoscope = {
    sign : Text;
    dailyText : Text;
  };

  module Horoscope {
    public func compare(h1 : Horoscope, h2 : Horoscope) : Order.Order {
      Text.compare(h1.sign, h2.sign);
    };
  };

  let dailyHoroscopes = Map.empty<Text, Horoscope>();
  let zodiacs = Map.empty<Text, ZodiacSign>();

  let admin : Principal = Principal.fromText(
    "2vxsx-fae"
  );

  let sunSignExplanation : Text = "Your Sun sign represents your core identity, ego, and self-expression.";
  let moonSignExplanation : Text = "Your Moon sign reflects your emotions, inner world, and instincts.";
  let risingSignExplanation : Text = "Your Rising sign influences how others perceive you and your outward behavior.";

  let aboutPageContent : Text = "Welcome to the Astrology App! Explore horoscopes, birth chart info, and more.";

  // Zodiac initial setup
  system func preupgrade() {
    for (zodiac in zodiacData().values()) {
      zodiacs.add(zodiac.name, zodiac);
    };
  };

  func zodiacData() : [ZodiacSign] {
    [
      {
        name = "Aries";
        symbol = "♈︎";
        dateRange = "March 21 - April 19";
        element = "Fire";
        modality = "Cardinal";
        rulingPlanet = "Mars";
        description = "Bold, ambitious, and energetic.";
      },
      {
        name = "Taurus";
        symbol = "♉︎";
        dateRange = "April 20 - May 20";
        element = "Earth";
        modality = "Fixed";
        rulingPlanet = "Venus";
        description = "Reliable, patient, and practical.";
      },
      // ... Add remaining zodiac signs
    ];
  };

  // Queries
  public query ({ caller }) func getZodiacSigns() : async [ZodiacSign] {
    zodiacs.values().toArray().sort();
  };

  public query ({ caller }) func getDailyHoroscopes() : async [Horoscope] {
    dailyHoroscopes.values().toArray().sort();
  };

  public query ({ caller }) func getBirthChartInfo() : async {
    sun : Text;
    moon : Text;
    rising : Text;
  } {
    { sun = sunSignExplanation; moon = moonSignExplanation; rising = risingSignExplanation };
  };

  public query ({ caller }) func getAboutPage() : async Text {
    aboutPageContent;
  };

  // Update functions
  public shared ({ caller }) func updateHoroscope(sign : Text, text : Text) : async () {
    if (caller != admin) { Runtime.trap("Unauthorized") };
    let horoscope : Horoscope = {
      sign;
      dailyText = text;
    };
    dailyHoroscopes.add(sign, horoscope);
  };
};
