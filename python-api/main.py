from fastapi import FastAPI
import joblib
from pydantic import BaseModel
from model.mi import mi

app = FastAPI()

model = joblib.load("./random_forest.joblib")

class Pacient(BaseModel):
  data: list

  class Config:
    schema_extra = {
      "example": {
        "data": mi
      }
    }


@app.post("/classification")
async def mi_classification(pacient: Pacient):
    data = list(map(float, pacient.data))

    prediction = model.predict([data])

    return {"classification": str(prediction[0])}