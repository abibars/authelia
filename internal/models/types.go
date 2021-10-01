package models

import (
	"database/sql/driver"
	"fmt"
	"time"
)

// AuthenticationAttempt represent an authentication attempt.
type AuthenticationAttempt struct {
	Username   string `db:"username"`
	Successful bool   `db:"successful"`
	Time       DBTime `db:"time"`
}

type DBTime struct {
	time.Time
}

// Value returns the value for the database/sql driver.
func (t DBTime) Value() (value driver.Value, err error) {
	return driver.Value(t.Time.Unix()), nil
}

func (t *DBTime) Scan(src interface{}) (err error) {
	var value int64

	switch src.(type) {
	case int64:
		value = src.(int64)
	case nil:
		value = 0
	default:
		return fmt.Errorf("invalid type %T for DBTime", src)
	}

	*t = DBTime{
		time.Unix(value, 0),
	}

	return nil
}
