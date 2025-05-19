import OtcImage from "../../../assets/otcbanner.png";

const OtcBannerPage = () => {
  return (
    <div>
      <div
        className="flex flex-wrap items-center justify-evenly mx-auto gap-2 "
        style={{
          backgroundImage: "url('https://i.ibb.co/d09Q7hwr/otcbacground.png')",
        }}
      >
        <img src={OtcImage} alt="image" />
        <h1 className="text-4xl font-bold">
          OTC <br />
          Medicines
        </h1>
        <p className="w-80">
          QICmedicine refers to the medicine which anyone con buywithout a
          prescription. Peopletake QTCmedicines to treat heath issues without a
          prescription. OTC mediciestroat a variety of Mnesses andtheirsymptoms,
          Includingpain,coughsand colds, diarrhea, constipation, ache, and
          others
        </p>
      </div>

      <div className="mt-6">
        <h1 className="text-xl font-bold">On Call Doctor</h1>
        <p>
          Our expert and coper <br />
          dicine Services as well
        </p>
        <h1 className="text-xl font-bold">e-Diagnosis</h1>
        <p>
          osudpotro provides the Best Online Dlagnosis, Patients can got
          alltests done from the comfort of thelr home,osudpotro brings the
          fastest response and qulckest Test Somple Collection process possible,
          <br />
          User con choose from a list of lab tests, get samples collected from
          home, get their results via email or app and also get free Online
          Doctor Consultoncy, We provide the Best Digital Dlagnosis allover
          Dhako
        </p>
        <h1 className="mt-2 text-xl font-bold">Dedicated Call Center</h1>
        <p>
          Cur Call Conter is operated by Experienced Teleconsultants and are{" "}
          <br />
          always there to serve allcustomners at alltimes.
        </p>
      </div>
    </div>
  );
};

export default OtcBannerPage;
